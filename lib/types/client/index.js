import { X6_SETTINGS_NS, } from "../shared/settings-contract.js";
import { registerBrand } from "./brand/index.js";
import { registerHero } from "./hero/index.js";
import { registerPluginSettings } from "./settings/index.js";
import { registerSignIn } from "./sign-in/index.js";
import { registerSkillMarket } from "./skill-market/index.js";
import { registerWallet } from "./wallet/index.js";
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
];
/**
 * Register all X6 client features (orchestration only).
 * @param ctx - Client root context.
 */
export function apply(ctx) {
    const settings = ctx.configForms.get(X6_SETTINGS_NS);
    registerBrand(ctx, settings);
    registerHero(ctx, settings);
    registerSignIn(ctx);
    registerWallet(ctx);
    registerSkillMarket(ctx, settings);
    registerPluginSettings(ctx, settings);
}
//# sourceMappingURL=index.js.map