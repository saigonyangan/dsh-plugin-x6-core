import { jsx as _jsx } from "react/jsx-runtime";
import { PANEL_ID } from "./panel-id.js";
import { SkillMarketPage, SkillMarketPanelIcon } from "./SkillMarketPage.js";
import { skillMarketT } from "./locales.js";
/** Register「应用」panellist entry + main page (order above Plugins). */
export function registerSkillMarket(ctx, settings) {
    ctx.slots.inject('main', () => ctx.slots.register({
        name: 'main',
        key: PANEL_ID,
    }, () => _jsx(SkillMarketPage, { ctx: ctx, settings: settings })));
    ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
        name: 'sidebar.panellist',
        id: PANEL_ID,
        order: -10,
        label: () => skillMarketT(ctx.locale.getSnapshot().active)('nav'),
    }, (props) => _jsx(SkillMarketPanelIcon, { size: props.size, active: props.active })));
}
//# sourceMappingURL=index.js.map