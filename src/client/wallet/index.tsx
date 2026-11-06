/** Register X6 wallet as a settings section (no sidebar entry). */

import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { watchSettingsWalletNavIcon } from './patchSettingsNavIcon.ts'
import { WalletSettingsSection } from './WalletSettingsSection.tsx'
import { walletT } from './locales.ts'

/** Register「用户余额」under Settings → sections. */
export function registerWallet(ctx: ClientContext): void {
  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section',
    id: 'x6-wallet',
    order: -20,
    label: () => walletT(ctx.locale.getSnapshot().active)('nav'),
  }, (owner) => (
    <WalletSettingsSection ctx={ctx} close={owner.close} />
  )))

  // SettingsRoot hard-codes nav glyphs by id; patch wallet row without touching engine.
  ctx.effect(() => watchSettingsWalletNavIcon(), 'x6-core: wallet-nav-icon')
}
