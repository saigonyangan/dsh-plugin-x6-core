import { jsx as _jsx } from "react/jsx-runtime";
import { skillMarketT } from "../skill-market/locales.js";
import { SidebarFooterRoot } from "./SidebarFooterRoot.js";
/** Register skill-market footer action (waits for session services used by market). */
export function registerSidebarFooter(ctx, settings) {
    ctx.inject(['uiSession', 'modelDirectories'], (scope) => {
        scope.slots.inject('sidebar.footer.action', () => scope.slots.register({
            name: 'sidebar.footer.action',
            id: 'x6-sidebar-footer',
            order: 0,
            label: () => skillMarketT(scope.locale.getSnapshot().active)('nav'),
        }, (props) => _jsx(SidebarFooterRoot, { ctx: scope, settings: settings, ...props })));
    });
}
//# sourceMappingURL=index.js.map