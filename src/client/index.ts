/** X6 client plugin: brand, hero, sign-in, and settings features. */
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
import { registerSignIn } from './sign-in/index.tsx'
import { registerSkillMarket } from './skill-market/index.tsx'
import { registerWallet } from './wallet/index.tsx'

/** Required client services. */
export const inject = [
  'slots',
  'remote',
  'remote.settings',
  'remote.pluginInventory',
  'locale',
  'connection',
  'configForms',
  'layout',
]

/**
 * Register all X6 client features (orchestration only).
 * @param ctx - Client root context.
 */
export function apply(ctx: ClientContext): void {
  const settings = ctx.configForms.get<X6UiSettings>(X6_SETTINGS_NS)
  registerBrand(ctx, settings)
  registerHero(ctx, settings)
  registerSignIn(ctx)
  registerWallet(ctx)
  registerSkillMarket(ctx, settings)
  registerPluginSettings(ctx, settings)
}
