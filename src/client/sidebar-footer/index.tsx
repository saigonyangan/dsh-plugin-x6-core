/** Sidebar footer: skill market only (wallet moved to Settings → 用户余额). */

import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-api-remotes/client'
import type {} from '@deepseek-ai/dsh-client-ui-model-selection/client'
import type {} from '@deepseek-ai/dsh-client-ui-session/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type { X6UiSettings } from '../../shared/settings-contract.ts'
import { skillMarketT } from '../skill-market/locales.ts'
import { SidebarFooterRoot } from './SidebarFooterRoot.tsx'

/** Register skill-market footer action (waits for session services used by market). */
export function registerSidebarFooter(
  ctx: ClientContext,
  settings: ConfigForm<X6UiSettings>,
): void {
  ctx.inject(['uiSession', 'modelDirectories'], (scope) => {
    scope.slots.inject('sidebar.footer.action', () => scope.slots.register({
      name: 'sidebar.footer.action',
      id: 'x6-sidebar-footer',
      order: 0,
      label: () => skillMarketT(scope.locale.getSnapshot().active)('nav'),
    }, (props) => <SidebarFooterRoot ctx={scope} settings={settings} {...props} />))
  })
}
