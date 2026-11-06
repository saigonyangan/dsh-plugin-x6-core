import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Main-panel body for the X6 app marketplace. */
import { useMemo, useSyncExternalStore } from 'react';
import { buildOfficialSiteUrl } from "../../shared/official-site.js";
import { useActiveLineId } from "../settings/useShowWalletPref.js";
import { useClientLocale } from "../use-client-locale.js";
import { PANEL_ID } from "./panel-id.js";
import { SkillMarketPanel } from "./SkillMarketPanel.js";
import { useSkillMarket } from "./useSkillMarket.js";
/** Full-page skill market opened from the sidebar「应用」entry. */
export function SkillMarketPage({ ctx, settings }) {
    const locale = useClientLocale(ctx);
    const lineId = useActiveLineId(settings);
    const officialSiteUrl = useMemo(() => buildOfficialSiteUrl({ lineId, locale: locale ?? null }), [lineId, locale]);
    const activePanelId = useSyncExternalStore((onStoreChange) => ctx.layout.panelInfo.subscribe(onStoreChange), () => ctx.layout.panelInfo.getSnapshot().activePanelId, () => null);
    const active = activePanelId === PANEL_ID;
    const state = useSkillMarket({ ctx, locale, open: active });
    return (_jsx(SkillMarketPanel, { state: state, officialSiteUrl: officialSiteUrl, embedded: true, onClose: () => { ctx.layout.selectPanel(null); } }));
}
export function SkillMarketPanelIcon(props) {
    const { size } = props;
    return (_jsxs("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: [_jsx("rect", { x: "2", y: "2", width: "5", height: "5", rx: "1.2", stroke: "currentColor", strokeWidth: "1.2" }), _jsx("rect", { x: "9", y: "2", width: "5", height: "5", rx: "1.2", stroke: "currentColor", strokeWidth: "1.2" }), _jsx("rect", { x: "2", y: "9", width: "5", height: "5", rx: "1.2", stroke: "currentColor", strokeWidth: "1.2" }), _jsx("rect", { x: "9", y: "9", width: "5", height: "5", rx: "1.2", stroke: "currentColor", strokeWidth: "1.2" })] }));
}
//# sourceMappingURL=SkillMarketPage.js.map