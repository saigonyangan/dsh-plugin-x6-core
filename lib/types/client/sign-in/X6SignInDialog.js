import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/** X6 authorize dialog: OAuth only (no manual API Key path). */
import { useEffect, useRef, useState } from 'react';
import { Button, IconCloseOutlineRegular, IconLoadingOutlineRegular, Modal, } from '@deepseek-ai/dsh-client-ui-primitives';
import { useQuickSetup } from "../quick-setup/useQuickSetup.js";
import { quickSetupT } from "../quick-setup/locales.js";
import { fetchWalletStatus } from "../wallet/wire.js";
import css from './sign-in.module.css';
/** Blocking X6 authorize modal occupying `settings.models.sign-in`. */
export function X6SignInDialog(props) {
    const { complete, ctx, locale, entry = 'onboarding' } = props;
    const t = quickSetupT(locale);
    const completedRef = useRef(false);
    const autoStartedRef = useRef(false);
    const [gate, setGate] = useState('checking');
    const [copyHint, setCopyHint] = useState(false);
    const finish = () => {
        if (completedRef.current)
            return;
        completedRef.current = true;
        complete();
    };
    const state = useQuickSetup({
        ctx,
        locale,
        onDone: () => {
            window.setTimeout(finish, 600);
        },
    });
    const busy = state.phase === 'starting' || state.phase === 'writing';
    const waiting = state.phase === 'awaiting-approval';
    const error = state.phase === 'error';
    const done = state.phase === 'done';
    const reauth = gate === 'reauth';
    const reauthPending = reauth && (state.phase === 'idle' || state.phase === 'starting');
    useEffect(() => {
        let cancelled = false;
        void (async () => {
            let configured = false;
            try {
                const status = await fetchWalletStatus();
                configured = status.connected;
            }
            catch {
                configured = false;
            }
            if (cancelled)
                return;
            if (!configured) {
                setGate('guide');
                return;
            }
            // Already has X6 API Key: never show「开始使用」guidance.
            if (entry === 'onboarding') {
                setGate('dismissed');
                finish();
                return;
            }
            setGate('reauth');
        })();
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entry]);
    useEffect(() => {
        const appRoot = document.getElementById('root');
        if (appRoot === null)
            return;
        const previous = appRoot.inert;
        appRoot.inert = gate !== 'dismissed' && gate !== 'checking';
        return () => { appRoot.inert = previous; };
    }, [gate]);
    useEffect(() => {
        if (gate !== 'reauth' || autoStartedRef.current)
            return;
        autoStartedRef.current = true;
        void state.start();
    }, [gate, state.start]);
    useEffect(() => {
        if (!copyHint)
            return;
        const timer = window.setTimeout(() => setCopyHint(false), 2000);
        return () => window.clearTimeout(timer);
    }, [copyHint]);
    const copyLink = async () => {
        const url = state.copyUrl ?? state.authorizeUrl;
        if (url === undefined)
            return;
        try {
            await navigator.clipboard.writeText(url);
            setCopyHint(true);
        }
        catch {
            // ignore clipboard failures
        }
    };
    if (gate === 'checking' || gate === 'dismissed') {
        return null;
    }
    const title = error
        ? t('error')
        : waiting || busy || reauthPending
            ? t('browserTitle')
            : done
                ? t('signInDone')
                : t('signInTitle');
    const description = waiting
        ? (_jsxs(_Fragment, { children: [t('browserPrompt'), _jsx("button", { type: "button", className: css.link, disabled: (state.copyUrl ?? state.authorizeUrl) === undefined, onClick: () => { void copyLink(); }, children: copyHint ? t('copiedLink') : t('copyLink') }), t('browserDescription')] }))
        : error && state.message !== undefined
            ? state.message
            : done
                ? t('signInDone')
                : reauthPending
                    ? t('awaiting')
                    : t('signInDescription');
    return (_jsxs(Modal, { open: true, headless: true, title: title, onClose: finish, className: css.dialog, children: [_jsxs("div", { className: css.content, children: [_jsxs("div", { className: css.header, children: [_jsx("h2", { className: css.title, children: title }), _jsx("button", { type: "button", className: css.close, "aria-label": t('close'), onClick: finish, children: _jsx(IconCloseOutlineRegular, { size: 14 }) })] }), _jsx("p", { className: css.description, children: description })] }), _jsxs("div", { className: css.actions, children: [_jsx(Button, { variant: "outline", className: css.secondaryButton, disabled: done || (busy && !waiting), onClick: finish, children: waiting || reauth || busy ? t('cancel') : t('later') }), _jsx(Button, { variant: "primary", className: css.primaryButton, disabled: busy || waiting || done || reauthPending, "aria-label": waiting || reauthPending ? t('waiting') : undefined, onClick: () => {
                            void state.start();
                        }, children: waiting || busy || reauthPending
                            ? _jsx(IconLoadingOutlineRegular, { className: css.spinner })
                            : error
                                ? t('retry')
                                : t('signIn') })] })] }));
}
//# sourceMappingURL=X6SignInDialog.js.map