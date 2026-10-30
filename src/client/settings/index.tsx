/** Register the X6 card on the Plugins page. */

import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-ui-plugin-manager/client'
import {
  X6_SETTINGS_NS,
  type X6UiSettings,
} from '../../shared/settings-contract.ts'
import { X6SettingsCard } from './X6SettingsCard.tsx'
import { en, zh } from './locales.ts'

const LOCALE_NS = 'x6.settings'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    'x6.settings': keyof typeof zh
  }
}

/** Register `plugins.item` while Host serves the X6 volatile Config. */
export function registerPluginSettings(
  ctx: ClientContext,
  scope: ConfigForm<X6UiSettings>,
): void {
  const t = ctx.locale.bind(LOCALE_NS)
  ctx.effect(() => ctx.locale.register(LOCALE_NS, { zh, en }), 'x6-core: settings dictionaries')
  ctx.effect(() => ctx.configForms.whileServed([X6_SETTINGS_NS], () => ctx.slots.inject('plugins.item', () => ctx.slots.register({
    name: 'plugins.item',
    id: 'x6',
    order: 5,
    label: () => t('title'),
    locale: LOCALE_NS,
  }, (props) => (
    <X6SettingsCard ctx={ctx} scope={scope} {...props} />
  )))), 'x6-core: plugins.item')
}
