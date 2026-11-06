/** Brand slot registration for X6. */

import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client'
import type { X6UiSettings } from '../../shared/settings-contract.ts'
import { readShowBrand } from '../settings/useShowWalletPref.ts'
import { X6BrandMark, X6BrandName } from './Brand.tsx'
import { clearTabBranding, watchTabBrandingPatches } from './patchShellBranding.ts'

/**
 * When `showBrand` is on: occupy brand slots (priority -1 shadows DSH official / shell).
 * When off: dispose occupants so `ui-brand-official` or sidebar fallbacks render again.
 */
export function registerBrand(
  ctx: ClientContext,
  scope: ConfigForm<X6UiSettings>,
): void {
  ctx.effect(() => {
    let disposeSlots: (() => void) | undefined
    let stopPatches: (() => void) | undefined

    const sync = () => {
      disposeSlots?.()
      disposeSlots = undefined
      stopPatches?.()
      stopPatches = undefined

      if (!readShowBrand(scope)) {
        clearTabBranding()
        return
      }

      stopPatches = watchTabBrandingPatches()
      disposeSlots = ctx.slots.inject('sidebar.brand.mark', () =>
        ctx.slots.inject('sidebar.brand.name', () =>
          ctx.slots.inject('conversation.hero.brand.mark', function* () {
            yield ctx.slots.register({
              name: 'sidebar.brand.mark',
              priority: -1,
              registrant: '@x6_ai/dsh-plugin-x6-core',
            }, X6BrandMark)
            yield ctx.slots.register({
              name: 'sidebar.brand.name',
              priority: -1,
              registrant: '@x6_ai/dsh-plugin-x6-core',
            }, () => <X6BrandName />)
            yield ctx.slots.register({
              name: 'conversation.hero.brand.mark',
              priority: -1,
              registrant: '@x6_ai/dsh-plugin-x6-core',
            }, X6BrandMark)
          })))
    }

    sync()
    const unsub = scope.subscribe(sync)
    return () => {
      unsub()
      stopPatches?.()
      disposeSlots?.()
      clearTabBranding()
    }
  }, 'x6-core: brand')
}
