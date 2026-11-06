import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import { WALLET_ERROR, WALLET_POLL_MS, } from "../../shared/wallet-contract.js";
import { loadWalletSnapshot, peekWalletCache } from "./cache.js";
import { formatPointsRemaining, formatWalletAmount, formatWalletUnixDate, } from "./format.js";
import { walletT } from "./locales.js";
import css from './wallet.module.css';
function applySnapshot(snapshot, dict, setData, setUsagePoliciesUrl, setCredentialMismatch, setError, onBalanceChange) {
    setUsagePoliciesUrl(snapshot.status.usagePoliciesUrl);
    if (snapshot.kind === 'mismatch') {
        setData(undefined);
        setCredentialMismatch(true);
        setError(dict('keyMismatchHint'));
        onBalanceChange?.(undefined);
        return;
    }
    setCredentialMismatch(false);
    setData(snapshot.balance);
    setUsagePoliciesUrl(snapshot.balance.usagePoliciesUrl);
    setError(undefined);
    onBalanceChange?.(snapshot.balance);
}
/** Org-first wallet layout: primary org, then balance / points cards. */
export function WalletPanel({ locale, onClose, onBalanceChange, embedded = false }) {
    const t = walletT(locale);
    const cached = peekWalletCache(locale);
    const [loading, setLoading] = useState(cached === undefined);
    const [data, setData] = useState(cached?.kind === 'ok' ? cached.balance : undefined);
    const [error, setError] = useState(cached?.kind === 'mismatch' ? t('keyMismatchHint') : undefined);
    const [sessionRevoked, setSessionRevoked] = useState(false);
    const [credentialMismatch, setCredentialMismatch] = useState(cached?.kind === 'mismatch');
    const [usagePoliciesUrl, setUsagePoliciesUrl] = useState(cached?.status.usagePoliciesUrl
        ?? (cached?.kind === 'ok' ? cached.balance.usagePoliciesUrl : undefined));
    const load = useCallback(async (force = false) => {
        const hit = !force ? peekWalletCache(locale) : undefined;
        if (hit !== undefined) {
            applySnapshot(hit, walletT(locale), setData, setUsagePoliciesUrl, setCredentialMismatch, setError, onBalanceChange);
            setSessionRevoked(false);
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(undefined);
        setSessionRevoked(false);
        setCredentialMismatch(false);
        const dict = walletT(locale);
        try {
            const snapshot = await loadWalletSnapshot(locale, force);
            applySnapshot(snapshot, dict, setData, setUsagePoliciesUrl, setCredentialMismatch, setError, onBalanceChange);
        }
        catch (cause) {
            setData(undefined);
            onBalanceChange?.(undefined);
            const err = cause;
            if (err.message === 'HOST_API_NOT_FOUND' || err.message === 'not found') {
                setError(dict('hostApiMissing'));
            }
            else if (err.code === WALLET_ERROR.sessionRevoked) {
                setSessionRevoked(true);
                setError(dict('reauthHint'));
            }
            else if (err.code === WALLET_ERROR.credentialMismatch) {
                setCredentialMismatch(true);
                setError(dict('keyMismatchHint'));
            }
            else {
                setError(err.message.length > 0 ? err.message : dict('error'));
            }
        }
        finally {
            setLoading(false);
        }
    }, [locale, onBalanceChange]);
    useEffect(() => {
        void load(false);
    }, [load]);
    useEffect(() => {
        if (sessionRevoked || credentialMismatch)
            return;
        const timer = window.setInterval(() => {
            void load(true);
        }, WALLET_POLL_MS);
        return () => { window.clearInterval(timer); };
    }, [credentialMismatch, load, sessionRevoked]);
    const openBudget = useCallback(() => {
        const url = usagePoliciesUrl ?? data?.usagePoliciesUrl;
        if (url === undefined || url.length === 0)
            return;
        window.open(url, '_blank', 'noopener,noreferrer');
    }, [data?.usagePoliciesUrl, usagePoliciesUrl]);
    const budgetUrl = usagePoliciesUrl ?? data?.usagePoliciesUrl;
    const resetAt = data === undefined
        ? undefined
        : formatWalletUnixDate(data.nextPointsResetAtUnix, locale);
    const periodEnd = data === undefined
        ? undefined
        : formatWalletUnixDate(data.periodEndUnix, locale);
    const softHint = sessionRevoked || credentialMismatch;
    const orgName = data !== undefined && data.name.length > 0 ? data.name : undefined;
    return (_jsxs("div", { className: embedded ? css.pagePanel : css.panel, role: embedded ? 'region' : 'dialog', ...(embedded ? {} : { 'aria-modal': true }), "aria-labelledby": "x6-wallet-title", children: [_jsxs("div", { className: css.header, children: [_jsx("h2", { className: css.title, id: "x6-wallet-title", children: t('title') }), _jsxs("div", { className: css.headerAside, children: [orgName !== undefined ? (_jsxs("div", { className: css.orgBlock, children: [_jsx("p", { className: css.orgCaption, children: t('orgLabel') }), _jsx("p", { className: css.orgName, children: orgName })] })) : null, embedded ? null : (_jsx("button", { type: "button", className: css.closeBtn, "aria-label": t('close'), onClick: onClose, children: "\u00D7" }))] })] }), loading && data === undefined && !credentialMismatch ? (_jsx("p", { className: css.status, children: t('loading') })) : null, data !== undefined ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: css.metricGrid, children: [_jsxs("section", { className: `${css.metricCard} ${css.metricCardBalance}`, "aria-label": t('balanceLabel'), children: [_jsx("p", { className: css.metricLabel, children: t('balanceLabel') }), _jsx("p", { className: `${css.metricValue} ${css.metricValueBalance}`, children: formatWalletAmount(data.availableBalance, data.currency) })] }), _jsxs("section", { className: `${css.metricCard} ${css.metricCardPoints}`, "aria-label": t('pointsLabel'), children: [_jsx("p", { className: css.metricLabel, children: t('pointsLabel') }), _jsx("p", { className: `${css.metricValue} ${css.metricValuePoints}`, children: formatPointsRemaining(data.pointsRemaining, locale) })] })] }), _jsxs("dl", { className: css.metaList, children: [data.pointsGranted.length > 0 && data.pointsGranted !== '0' ? (_jsxs("div", { className: css.metaRow, children: [_jsx("dt", { children: t('pointsGrantedLabel') }), _jsx("dd", { children: formatPointsRemaining(data.pointsGranted, locale) })] })) : null, resetAt !== undefined ? (_jsxs("div", { className: css.metaRow, children: [_jsx("dt", { children: t('resetAtLabel') }), _jsx("dd", { children: resetAt })] })) : null, periodEnd !== undefined ? (_jsxs("div", { className: css.metaRow, children: [_jsx("dt", { children: t('periodEndLabel') }), _jsx("dd", { children: periodEnd })] })) : null] })] })) : null, error !== undefined ? (_jsx("p", { className: softHint ? css.hint : css.error, children: error })) : (_jsx("p", { className: css.hint, children: t('budgetHint') })), _jsxs("div", { className: css.actions, children: [_jsx("button", { type: "button", className: css.button, disabled: budgetUrl === undefined || budgetUrl.length === 0 || credentialMismatch, onClick: openBudget, children: t('configureBudget') }), _jsx("button", { type: "button", className: css.buttonSecondary, disabled: loading, onClick: () => { void load(true); }, children: t('refresh') })] })] }));
}
//# sourceMappingURL=WalletPanel.js.map