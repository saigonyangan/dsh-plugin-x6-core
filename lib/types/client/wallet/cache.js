/** In-memory wallet snapshot cache (1 minute). */
import { WALLET_POLL_MS } from "../../shared/wallet-contract.js";
import { fetchWalletBalance, fetchWalletStatus } from "./wire.js";
let cache;
function localeKey(locale) {
    return locale ?? '';
}
/** True when a fresh cache entry exists for this locale. */
export function hasFreshWalletCache(locale, now = Date.now()) {
    if (cache === undefined)
        return false;
    if (cache.localeKey !== localeKey(locale))
        return false;
    return now - cache.fetchedAt < WALLET_POLL_MS;
}
/** Read cache without network (undefined when missing / stale / locale mismatch). */
export function peekWalletCache(locale) {
    if (!hasFreshWalletCache(locale))
        return undefined;
    return cache?.snapshot;
}
/** Drop cache (e.g. after forced refresh failure is optional; usually overwrite). */
export function clearWalletCache() {
    cache = undefined;
}
/**
 * Load wallet status + balance, reusing a ≤1min cache unless `force`.
 * @param locale - UI locale forwarded to balance API.
 * @param force - bypass cache (manual「刷新」).
 */
export async function loadWalletSnapshot(locale, force = false) {
    if (!force) {
        const hit = peekWalletCache(locale);
        if (hit !== undefined)
            return hit;
    }
    const status = await fetchWalletStatus();
    if (status.connected && status.credentialAligned === false) {
        const snapshot = { kind: 'mismatch', status };
        cache = { localeKey: localeKey(locale), snapshot, fetchedAt: Date.now() };
        return snapshot;
    }
    const balance = await fetchWalletBalance(locale);
    const snapshot = { kind: 'ok', status, balance };
    cache = { localeKey: localeKey(locale), snapshot, fetchedAt: Date.now() };
    return snapshot;
}
//# sourceMappingURL=cache.js.map