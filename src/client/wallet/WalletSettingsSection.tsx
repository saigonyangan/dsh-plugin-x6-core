/** Settings page body for X6 wallet balance. */

import type { Context as ClientContext } from '@deepseek-ai/cordis'
import { useClientLocale } from '../use-client-locale.ts'
import { WalletPanel } from './WalletPanel.tsx'
import css from './wallet.module.css'

export interface WalletSettingsSectionProps {
  readonly ctx: ClientContext
  readonly close: () => void
}

/** Renders the existing wallet panel inside a settings section. */
export function WalletSettingsSection(props: WalletSettingsSectionProps) {
  const locale = useClientLocale(props.ctx)
  return (
    <div className={css.page}>
      <WalletPanel locale={locale} onClose={props.close} embedded />
    </div>
  )
}
