import { jsx as _jsx } from "react/jsx-runtime";
import { X6_SETTINGS_NS, } from "../../shared/settings-contract.js";
import { X6SettingsCard } from "./X6SettingsCard.js";
import { en, zh } from "./locales.js";
const LOCALE_NS = 'x6.settings';
/** Register `plugins.item` while Host serves the X6 volatile Config. */
export function registerPluginSettings(ctx, scope) {
    const t = ctx.locale.bind(LOCALE_NS);
    ctx.effect(() => ctx.locale.register(LOCALE_NS, { zh, en }), 'x6-core: settings dictionaries');
    ctx.effect(() => ctx.configForms.whileServed([X6_SETTINGS_NS], () => ctx.slots.inject('plugins.item', () => ctx.slots.register({
        name: 'plugins.item',
        id: 'x6',
        order: 5,
        label: () => t('title'),
        locale: LOCALE_NS,
    }, (props) => (_jsx(X6SettingsCard, { ctx: ctx, scope: scope, ...props }))))), 'x6-core: plugins.item');
}
//# sourceMappingURL=index.js.map