/** Register X6 app marketplace as a sidebar panel above Plugins. */

import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-api-remotes/client'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type { X6UiSettings } from '../../shared/settings-contract.ts'
import { PANEL_ID } from './panel-id.ts'
import { SkillMarketPage, SkillMarketPanelIcon } from './SkillMarketPage.tsx'
import { skillMarketT } from './locales.ts'

/** Register「应用」panellist entry + main page (order above Plugins). */
export function registerSkillMarket(
  ctx: ClientContext,
  settings: ConfigForm<X6UiSettings>,
): void {
  ctx.slots.inject('main', () => ctx.slots.register({
    name: 'main',
    key: PANEL_ID,
  }, () => <SkillMarketPage ctx={ctx} settings={settings} />))

  ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
    name: 'sidebar.panellist',
    id: PANEL_ID,
    order: -10,
    label: () => skillMarketT(ctx.locale.getSnapshot().active)('nav'),
  }, (props) => <SkillMarketPanelIcon size={props.size} active={props.active} />))
}
