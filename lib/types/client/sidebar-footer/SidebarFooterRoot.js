import { jsx as _jsx } from "react/jsx-runtime";
import { SkillMarketRoot } from "../skill-market/SkillMarketRoot.js";
import { FooterErrorBoundary } from "./FooterErrorBoundary.js";
import css from './sidebar-footer.module.css';
/** Sidebar footer occupant for skill market (wallet lives in Settings). */
export function SidebarFooterRoot(props) {
    const { settings, ...rest } = props;
    return (_jsx("div", { className: css.stack, children: _jsx(FooterErrorBoundary, { label: "skill-market", children: _jsx(SkillMarketRoot, { ...rest, settings: settings }) }) }));
}
//# sourceMappingURL=SidebarFooterRoot.js.map