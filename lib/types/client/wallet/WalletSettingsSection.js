import { jsx as _jsx } from "react/jsx-runtime";
import { useClientLocale } from "../use-client-locale.js";
import { WalletPanel } from "./WalletPanel.js";
import css from './wallet.module.css';
/** Renders the existing wallet panel inside a settings section. */
export function WalletSettingsSection(props) {
    const locale = useClientLocale(props.ctx);
    return (_jsx("div", { className: css.page, children: _jsx(WalletPanel, { locale: locale, onClose: props.close, embedded: true }) }));
}
//# sourceMappingURL=WalletSettingsSection.js.map