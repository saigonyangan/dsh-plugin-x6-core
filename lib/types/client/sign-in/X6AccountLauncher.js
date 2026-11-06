import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Sidebar account launcher: authorize / re-authorize opens X6 OAuth dialog. */
import { useCallback, useEffect, useRef, useState } from 'react';
import { IconEllipsisOutlineMedium, IconSettingsOutlineMedium, IconUserOutlineMedium, Menu, } from '@deepseek-ai/dsh-client-ui-primitives';
import { useClientLocale } from "../use-client-locale.js";
import { fetchWalletStatus } from "../wallet/wire.js";
import { X6SignInDialog } from "./X6SignInDialog.js";
import css from './account-launcher.module.css';
const launcherCopy = {
    'zh-CN': {
        more: '更多',
        menu: '账号菜单',
        settings: '设置',
        signIn: '登录授权',
        reauth: '重新授权',
    },
    'en-US': {
        more: 'More',
        menu: 'Account menu',
        settings: 'Settings',
        signIn: 'Authorize',
        reauth: 'Re-authorize',
    },
};
/**
 * Signed-out-style launcher. Menu authorize item mounts {@link X6SignInDialog}
 * (avoids explicit `openOnboarding('deepseek-official')`, which skips the sign-in
 * slot and jumps to the official DeepSeek API-key editor).
 * Label switches to「重新授权」when an X6 API Key is already configured.
 */
export function X6AccountLauncher(props) {
    const { ctx, wide, openSettings, settingsShortcut } = props;
    const locale = useClientLocale(ctx);
    const copy = locale?.startsWith('zh') ? launcherCopy['zh-CN'] : launcherCopy['en-US'];
    const trigger = useRef(null);
    const [open, setOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [hasApiKey, setHasApiKey] = useState(false);
    const refreshApiKeyState = useCallback(async () => {
        try {
            const status = await fetchWalletStatus();
            setHasApiKey(status.connected);
        }
        catch {
            setHasApiKey(false);
        }
    }, []);
    useEffect(() => {
        void refreshApiKeyState();
    }, [refreshApiKeyState]);
    const closeLogin = useCallback(() => {
        setLoginOpen(false);
        void refreshApiKeyState();
    }, [refreshApiKeyState]);
    return (_jsxs("div", { className: css.root, children: [_jsx(Menu, { open: open, side: "top", portal: true, autoFocus: true, className: css.anchor, listClassName: css.signedOutMenu, anchor: (_jsxs("button", { ref: trigger, type: "button", className: css.trigger, "data-collapsed": !wide, "data-signed-out": "true", "aria-label": copy.menu, "aria-haspopup": "menu", "aria-expanded": open, onClick: () => {
                        void refreshApiKeyState();
                        setOpen(value => !value);
                    }, children: [_jsx(IconEllipsisOutlineMedium, { size: 14 }), wide && _jsx("span", { className: css.label, children: copy.more })] })), items: [
                    {
                        id: 'settings',
                        label: copy.settings,
                        icon: _jsx(IconSettingsOutlineMedium, { size: 16 }),
                        ...(settingsShortcut === undefined ? {} : { shortcut: settingsShortcut }),
                    },
                    {
                        id: 'signin',
                        label: hasApiKey ? copy.reauth : copy.signIn,
                        icon: _jsx(IconUserOutlineMedium, { size: 16 }),
                    },
                ], onClose: () => { setOpen(false); }, onSelect: (id) => {
                    setOpen(false);
                    if (id === 'settings') {
                        trigger.current?.focus();
                        openSettings();
                        return;
                    }
                    if (id === 'signin')
                        setLoginOpen(true);
                } }), loginOpen && (_jsx(X6SignInDialog, { ctx: ctx, locale: locale, complete: closeLogin, useApiKey: closeLogin, entry: "menu" }))] }));
}
//# sourceMappingURL=X6AccountLauncher.js.map