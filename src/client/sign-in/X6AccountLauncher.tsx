/** Sidebar account launcher: authorize / re-authorize opens X6 OAuth dialog. */

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import {
  IconEllipsisOutlineMedium,
  IconSettingsOutlineMedium,
  IconUserOutlineMedium,
  Menu,
} from '@deepseek-ai/dsh-client-ui-primitives'
import { useClientLocale } from '../use-client-locale.ts'
import { fetchWalletStatus } from '../wallet/wire.ts'
import { X6SignInDialog } from './X6SignInDialog.tsx'
import css from './account-launcher.module.css'

export type X6AccountLauncherProps =
  PropsRuntime<'settings.launcher'> & { readonly ctx: ClientContext }

const launcherCopy = {
  'zh-CN': {
    more: '更多',
    menu: '账号菜单',
    settings: '设置',
    signIn: '登录授权',
    reauth: '重新授权',
  },
  'en-US': {
    more: 'More',
    menu: 'Account menu',
    settings: 'Settings',
    signIn: 'Authorize',
    reauth: 'Re-authorize',
  },
} as const

/**
 * Signed-out-style launcher. Menu authorize item mounts {@link X6SignInDialog}
 * (avoids explicit `openOnboarding('deepseek-official')`, which skips the sign-in
 * slot and jumps to the official DeepSeek API-key editor).
 * Label switches to「重新授权」when an X6 API Key is already configured.
 */
export function X6AccountLauncher(props: X6AccountLauncherProps) {
  const { ctx, wide, openSettings, settingsShortcut } = props
  const locale = useClientLocale(ctx)
  const copy = locale?.startsWith('zh') ? launcherCopy['zh-CN'] : launcherCopy['en-US']
  const trigger = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [hasApiKey, setHasApiKey] = useState(false)

  const refreshApiKeyState = useCallback(async () => {
    try {
      const status = await fetchWalletStatus()
      setHasApiKey(status.connected)
    } catch {
      setHasApiKey(false)
    }
  }, [])

  useEffect(() => {
    void refreshApiKeyState()
  }, [refreshApiKeyState])

  const closeLogin = useCallback(() => {
    setLoginOpen(false)
    void refreshApiKeyState()
  }, [refreshApiKeyState])

  return (
    <div className={css.root}>
      <Menu
        open={open}
        side="top"
        portal
        autoFocus
        className={css.anchor}
        listClassName={css.signedOutMenu}
        anchor={(
          <button
            ref={trigger}
            type="button"
            className={css.trigger}
            data-collapsed={!wide}
            data-signed-out="true"
            aria-label={copy.menu}
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => {
              void refreshApiKeyState()
              setOpen(value => !value)
            }}
          >
            <IconEllipsisOutlineMedium size={14} />
            {wide && <span className={css.label}>{copy.more}</span>}
          </button>
        )}
        items={[
          {
            id: 'settings',
            label: copy.settings,
            icon: <IconSettingsOutlineMedium size={16} />,
            ...(settingsShortcut === undefined ? {} : { shortcut: settingsShortcut }),
          },
          {
            id: 'signin',
            label: hasApiKey ? copy.reauth : copy.signIn,
            icon: <IconUserOutlineMedium size={16} />,
          },
        ]}
        onClose={() => { setOpen(false) }}
        onSelect={(id) => {
          setOpen(false)
          if (id === 'settings') {
            trigger.current?.focus()
            openSettings()
            return
          }
          if (id === 'signin') setLoginOpen(true)
        }}
      />
      {loginOpen && (
        <X6SignInDialog
          ctx={ctx}
          locale={locale}
          complete={closeLogin}
          useApiKey={closeLogin}
          entry="menu"
        />
      )}
    </div>
  )
}
