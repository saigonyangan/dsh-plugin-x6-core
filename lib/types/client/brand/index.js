import { jsx as _jsx } from "react/jsx-runtime";
import { readShowBrand } from "../settings/useShowWalletPref.js";
import { X6BrandMark, X6BrandName } from "./Brand.js";
import { clearTabBranding, watchTabBrandingPatches } from "./patchShellBranding.js";
/**
 * When `showBrand` is on: occupy brand slots (priority -1 shadows DSH official / shell).
 * When off: dispose occupants so `ui-brand-official` or sidebar fallbacks render again.
 */
export function registerBrand(ctx, scope) {
    ctx.effect(() => {
        let disposeSlots;
        let stopPatches;
        const sync = () => {
            disposeSlots?.();
            disposeSlots = undefined;
            stopPatches?.();
            stopPatches = undefined;
            if (!readShowBrand(scope)) {
                clearTabBranding();
                return;
            }
            stopPatches = watchTabBrandingPatches();
            disposeSlots = ctx.slots.inject('sidebar.brand.mark', () => ctx.slots.inject('sidebar.brand.name', () => ctx.slots.inject('conversation.hero.brand.mark', function* () {
                yield ctx.slots.register({
                    name: 'sidebar.brand.mark',
                    priority: -1,
                    registrant: '@x6_ai/dsh-plugin-x6-core',
                }, X6BrandMark);
                yield ctx.slots.register({
                    name: 'sidebar.brand.name',
                    priority: -1,
                    registrant: '@x6_ai/dsh-plugin-x6-core',
                }, () => _jsx(X6BrandName, {}));
                yield ctx.slots.register({
                    name: 'conversation.hero.brand.mark',
                    priority: -1,
                    registrant: '@x6_ai/dsh-plugin-x6-core',
                }, X6BrandMark);
            })));
        };
        sync();
        const unsub = scope.subscribe(sync);
        return () => {
            unsub();
            stopPatches?.();
            disposeSlots?.();
            clearTabBranding();
        };
    }, 'x6-core: brand');
}
//# sourceMappingURL=index.js.map