import { jsx as _jsx } from "react/jsx-runtime";
import { watchSettingsWalletNavIcon } from "./patchSettingsNavIcon.js";
import { WalletSettingsSection } from "./WalletSettingsSection.js";
import { walletT } from "./locales.js";
/** Register「用户余额」under Settings → sections. */
export function registerWallet(ctx) {
    ctx.slots.inject('settings.section', () => ctx.slots.register({
        name: 'settings.section',
        id: 'x6-wallet',
        order: -20,
        label: () => walletT(ctx.locale.getSnapshot().active)('nav'),
    }, (owner) => (_jsx(WalletSettingsSection, { ctx: ctx, close: owner.close }))));
    // SettingsRoot hard-codes nav glyphs by id; patch wallet row without touching engine.
    ctx.effect(() => watchSettingsWalletNavIcon(), 'x6-core: wallet-nav-icon');
}
//# sourceMappingURL=index.js.map