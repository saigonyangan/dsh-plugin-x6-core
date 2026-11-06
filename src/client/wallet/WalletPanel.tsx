import { useCallback, useEffect, useState } from 'react'
import {
  WALLET_ERROR,
  WALLET_POLL_MS,
  type WalletBalanceResponse,
} from '../../shared/wallet-contract.ts'
import { loadWalletSnapshot, peekWalletCache, type WalletSnapshot } from './cache.ts'
import {
  formatPointsRemaining,
  formatWalletAmount,
  formatWalletUnixDate,
} from './format.ts'
import { walletT } from './locales.ts'
import css from './wallet.module.css'

export interface WalletPanelProps {
  readonly locale: string | undefined
  readonly onClose: () => void
  readonly onBalanceChange?: (balance: WalletBalanceResponse | undefined) => void
  /** Settings page embed: no modal chrome / dialog role. */
  readonly embedded?: boolean
}

function applySnapshot(
  snapshot: WalletSnapshot,
  dict: ReturnType<typeof walletT>,
  setData: (v: WalletBalanceResponse | undefined) => void,
  setUsagePoliciesUrl: (v: string | undefined) => void,
  setCredentialMismatch: (v: boolean) => void,
  setError: (v: string | undefined) => void,
  onBalanceChange: ((balance: WalletBalanceResponse | undefined) => void) | undefined,
): void {
  setUsagePoliciesUrl(snapshot.status.usagePoliciesUrl)
  if (snapshot.kind === 'mismatch') {
    setData(undefined)
    setCredentialMismatch(true)
    setError(dict('keyMismatchHint'))
    onBalanceChange?.(undefined)
    return
  }
  setCredentialMismatch(false)
  setData(snapshot.balance)
  setUsagePoliciesUrl(snapshot.balance.usagePoliciesUrl)
  setError(undefined)
  onBalanceChange?.(snapshot.balance)
}

/** Org-first wallet layout: primary org, then balance / points cards. */
export function WalletPanel({ locale, onClose, onBalanceChange, embedded = false }: WalletPanelProps) {
  const t = walletT(locale)
  const cached = peekWalletCache(locale)
  const [loading, setLoading] = useState(cached === undefined)
  const [data, setData] = useState<WalletBalanceResponse | undefined>(
    cached?.kind === 'ok' ? cached.balance : undefined,
  )
  const [error, setError] = useState<string | undefined>(
    cached?.kind === 'mismatch' ? t('keyMismatchHint') : undefined,
  )
  const [sessionRevoked, setSessionRevoked] = useState(false)
  const [credentialMismatch, setCredentialMismatch] = useState(cached?.kind === 'mismatch')
  const [usagePoliciesUrl, setUsagePoliciesUrl] = useState<string | undefined>(
    cached?.status.usagePoliciesUrl
      ?? (cached?.kind === 'ok' ? cached.balance.usagePoliciesUrl : undefined),
  )

  const load = useCallback(async (force = false) => {
    const hit = !force ? peekWalletCache(locale) : undefined
    if (hit !== undefined) {
      applySnapshot(
        hit,
        walletT(locale),
        setData,
        setUsagePoliciesUrl,
        setCredentialMismatch,
        setError,
        onBalanceChange,
      )
      setSessionRevoked(false)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(undefined)
    setSessionRevoked(false)
    setCredentialMismatch(false)
    const dict = walletT(locale)
    try {
      const snapshot = await loadWalletSnapshot(locale, force)
      applySnapshot(
        snapshot,
        dict,
        setData,
        setUsagePoliciesUrl,
        setCredentialMismatch,
        setError,
        onBalanceChange,
      )
    } catch (cause: unknown) {
      setData(undefined)
      onBalanceChange?.(undefined)
      const err = cause as Error & { code?: string }
      if (err.message === 'HOST_API_NOT_FOUND' || err.message === 'not found') {
        setError(dict('hostApiMissing'))
      } else if (err.code === WALLET_ERROR.sessionRevoked) {
        setSessionRevoked(true)
        setError(dict('reauthHint'))
      } else if (err.code === WALLET_ERROR.credentialMismatch) {
        setCredentialMismatch(true)
        setError(dict('keyMismatchHint'))
      } else {
        setError(err.message.length > 0 ? err.message : dict('error'))
      }
    } finally {
      setLoading(false)
    }
  }, [locale, onBalanceChange])

  useEffect(() => {
    void load(false)
  }, [load])

  useEffect(() => {
    if (sessionRevoked || credentialMismatch) return
    const timer = window.setInterval(() => {
      void load(true)
    }, WALLET_POLL_MS)
    return () => { window.clearInterval(timer) }
  }, [credentialMismatch, load, sessionRevoked])

  const openBudget = useCallback(() => {
    const url = usagePoliciesUrl ?? data?.usagePoliciesUrl
    if (url === undefined || url.length === 0) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [data?.usagePoliciesUrl, usagePoliciesUrl])

  const budgetUrl = usagePoliciesUrl ?? data?.usagePoliciesUrl
  const resetAt = data === undefined
    ? undefined
    : formatWalletUnixDate(data.nextPointsResetAtUnix, locale)
  const periodEnd = data === undefined
    ? undefined
    : formatWalletUnixDate(data.periodEndUnix, locale)
  const softHint = sessionRevoked || credentialMismatch
  const orgName = data !== undefined && data.name.length > 0 ? data.name : undefined

  return (
    <div
      className={embedded ? css.pagePanel : css.panel}
      role={embedded ? 'region' : 'dialog'}
      {...(embedded ? {} : { 'aria-modal': true as const })}
      aria-labelledby="x6-wallet-title"
    >
      <div className={css.header}>
        <h2 className={css.title} id="x6-wallet-title">{t('title')}</h2>
        <div className={css.headerAside}>
          {orgName !== undefined ? (
            <div className={css.orgBlock}>
              <p className={css.orgCaption}>{t('orgLabel')}</p>
              <p className={css.orgName}>{orgName}</p>
            </div>
          ) : null}
          {embedded ? null : (
            <button type="button" className={css.closeBtn} aria-label={t('close')} onClick={onClose}>
              ×
            </button>
          )}
        </div>
      </div>

      {loading && data === undefined && !credentialMismatch ? (
        <p className={css.status}>{t('loading')}</p>
      ) : null}

      {data !== undefined ? (
        <>
          <div className={css.metricGrid}>
            <section className={`${css.metricCard} ${css.metricCardBalance}`} aria-label={t('balanceLabel')}>
              <p className={css.metricLabel}>{t('balanceLabel')}</p>
              <p className={`${css.metricValue} ${css.metricValueBalance}`}>
                {formatWalletAmount(data.availableBalance, data.currency)}
              </p>
            </section>
            <section className={`${css.metricCard} ${css.metricCardPoints}`} aria-label={t('pointsLabel')}>
              <p className={css.metricLabel}>{t('pointsLabel')}</p>
              <p className={`${css.metricValue} ${css.metricValuePoints}`}>
                {formatPointsRemaining(data.pointsRemaining, locale)}
              </p>
            </section>
          </div>

          <dl className={css.metaList}>
            {data.pointsGranted.length > 0 && data.pointsGranted !== '0' ? (
              <div className={css.metaRow}>
                <dt>{t('pointsGrantedLabel')}</dt>
                <dd>{formatPointsRemaining(data.pointsGranted, locale)}</dd>
              </div>
            ) : null}
            {resetAt !== undefined ? (
              <div className={css.metaRow}>
                <dt>{t('resetAtLabel')}</dt>
                <dd>{resetAt}</dd>
              </div>
            ) : null}
            {periodEnd !== undefined ? (
              <div className={css.metaRow}>
                <dt>{t('periodEndLabel')}</dt>
                <dd>{periodEnd}</dd>
              </div>
            ) : null}
          </dl>
        </>
      ) : null}

      {error !== undefined ? (
        <p className={softHint ? css.hint : css.error}>{error}</p>
      ) : (
        <p className={css.hint}>{t('budgetHint')}</p>
      )}

      <div className={css.actions}>
        <button
          type="button"
          className={css.button}
          disabled={budgetUrl === undefined || budgetUrl.length === 0 || credentialMismatch}
          onClick={openBudget}
        >
          {t('configureBudget')}
        </button>
        <button
          type="button"
          className={css.buttonSecondary}
          disabled={loading}
          onClick={() => { void load(true) }}
        >
          {t('refresh')}
        </button>
      </div>
    </div>
  )
}
