/** X6 client plugin: brand, hero, and quick-setup features. */
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-api-remotes/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings-models/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import {
  X6_SETTINGS_NS,
  type X6UiSettings,
} from '../shared/settings-contract.ts'
import { registerBrand } from './brand/index.tsx'
import { registerHero } from './hero/index.ts'
import { registerPluginSettings } from './settings/index.tsx'
import { registerQuickSetup } from './quick-setup/index.tsx'
import { registerSidebarFooter } from './sidebar-footer/index.tsx'

/** Required client services. */
export const inject = [
  'slots',
  'remote',
  'remote.settings',
  'remote.pluginInventory',
  'locale',
  'connection',
  'configForms',
]

/**
 * Register all X6 client features (orchestration only).
 * @param ctx - Client root context.
 */
export function apply(ctx: ClientContext): void {
  const settings = ctx.configForms.get<X6UiSettings>(X6_SETTINGS_NS)
  registerBrand(ctx, settings)
  registerHero(ctx, settings)
  registerQuickSetup(ctx)
  registerPluginSettings(ctx, settings)
  registerSidebarFooter(ctx, settings)
}
