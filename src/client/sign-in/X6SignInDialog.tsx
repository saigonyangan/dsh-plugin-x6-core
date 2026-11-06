/** X6 authorize dialog: OAuth only (no manual API Key path). */

import { useEffect, useRef, useState } from 'react'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import {
  Button,
  IconCloseOutlineRegular,
  IconLoadingOutlineRegular,
  Modal,
} from '@deepseek-ai/dsh-client-ui-primitives'
import { useQuickSetup } from '../quick-setup/useQuickSetup.ts'
import { quickSetupT } from '../quick-setup/locales.ts'
import { fetchWalletStatus } from '../wallet/wire.ts'
import css from './sign-in.module.css'

export interface X6SignInDialogProps {
  readonly ctx: ClientContext
  readonly locale: string | undefined
  readonly complete: () => void
  /** Kept for slot compatibility with official SignInDialog owner props. */
  readonly useApiKey: () => void
  /**
   * `onboarding` — first-run guidance; dismissed immediately when X6 API Key exists.
   * `menu` — account menu authorize / re-authorize; skips intro and starts OAuth when key exists.
   */
  readonly entry?: 'onboarding' | 'menu'
}

type Gate = 'checking' | 'guide' | 'reauth' | 'dismissed'

/** Blocking X6 authorize modal occupying `settings.models.sign-in`. */
export function X6SignInDialog(props: X6SignInDialogProps) {
  const { complete, ctx, locale, entry = 'onboarding' } = props
  const t = quickSetupT(locale)
  const completedRef = useRef(false)
  const autoStartedRef = useRef(false)
  const [gate, setGate] = useState<Gate>('checking')
  const [copyHint, setCopyHint] = useState(false)

  const finish = () => {
    if (completedRef.current) return
    completedRef.current = true
    complete()
  }

  const state = useQuickSetup({
    ctx,
    locale,
    onDone: () => {
      window.setTimeout(finish, 600)
    },
  })

  const busy = state.phase === 'starting' || state.phase === 'writing'
  const waiting = state.phase === 'awaiting-approval'
  const error = state.phase === 'error'
  const done = state.phase === 'done'
  const reauth = gate === 'reauth'
  const reauthPending = reauth && (state.phase === 'idle' || state.phase === 'starting')

  useEffect(() => {
    let cancelled = false
    void (async () => {
      let configured = false
      try {
        const status = await fetchWalletStatus()
        configured = status.connected
      } catch {
        configured = false
      }
      if (cancelled) return
      if (!configured) {
        setGate('guide')
        return
      }
      // Already has X6 API Key: never show「开始使用」guidance.
      if (entry === 'onboarding') {
        setGate('dismissed')
        finish()
        return
      }
      setGate('reauth')
    })()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry])

  useEffect(() => {
    const appRoot = document.getElementById('root')
    if (appRoot === null) return
    const previous = appRoot.inert
    appRoot.inert = gate !== 'dismissed' && gate !== 'checking'
    return () => { appRoot.inert = previous }
  }, [gate])

  useEffect(() => {
    if (gate !== 'reauth' || autoStartedRef.current) return
    autoStartedRef.current = true
    void state.start()
  }, [gate, state.start])

  useEffect(() => {
    if (!copyHint) return
    const timer = window.setTimeout(() => setCopyHint(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copyHint])

  const copyLink = async () => {
    const url = state.copyUrl ?? state.authorizeUrl
    if (url === undefined) return
    try {
      await navigator.clipboard.writeText(url)
      setCopyHint(true)
    } catch {
      // ignore clipboard failures
    }
  }

  if (gate === 'checking' || gate === 'dismissed') {
    return null
  }

  const title = error
    ? t('error')
    : waiting || busy || reauthPending
      ? t('browserTitle')
      : done
        ? t('signInDone')
        : t('signInTitle')

  const description = waiting
    ? (
      <>
        {t('browserPrompt')}
        <button
          type="button"
          className={css.link}
          disabled={(state.copyUrl ?? state.authorizeUrl) === undefined}
          onClick={() => { void copyLink() }}
        >
          {copyHint ? t('copiedLink') : t('copyLink')}
        </button>
        {t('browserDescription')}
      </>
    )
    : error && state.message !== undefined
      ? state.message
      : done
        ? t('signInDone')
        : reauthPending
          ? t('awaiting')
          : t('signInDescription')

  return (
    <Modal open headless title={title} onClose={finish} className={css.dialog as string}>
      <div className={css.content}>
        <div className={css.header}>
          <h2 className={css.title}>{title}</h2>
          <button type="button" className={css.close} aria-label={t('close')} onClick={finish}>
            <IconCloseOutlineRegular size={14} />
          </button>
        </div>
        <p className={css.description}>{description}</p>
      </div>
      <div className={css.actions}>
        <Button
          variant="outline"
          className={css.secondaryButton}
          disabled={done || (busy && !waiting)}
          onClick={finish}
        >
          {waiting || reauth || busy ? t('cancel') : t('later')}
        </Button>
        <Button
          variant="primary"
          className={css.primaryButton}
          disabled={busy || waiting || done || reauthPending}
          aria-label={waiting || reauthPending ? t('waiting') : undefined}
          onClick={() => {
            void state.start()
          }}
        >
          {waiting || busy || reauthPending
            ? <IconLoadingOutlineRegular className={css.spinner} />
            : error
              ? t('retry')
              : t('signIn')}
        </Button>
      </div>
    </Modal>
  )
}
