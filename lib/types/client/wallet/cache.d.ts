/** In-memory wallet snapshot cache (1 minute). */
import { type WalletBalanceResponse, type WalletStatusResponse } from '../../shared/wallet-contract.ts';
export interface WalletSnapshotOk {
    readonly kind: 'ok';
    readonly status: WalletStatusResponse;
    readonly balance: WalletBalanceResponse;
}
export interface WalletSnapshotMismatch {
    readonly kind: 'mismatch';
    readonly status: WalletStatusResponse;
}
export type WalletSnapshot = WalletSnapshotOk | WalletSnapshotMismatch;
/** True when a fresh cache entry exists for this locale. */
export declare function hasFreshWalletCache(locale: string | undefined, now?: number): boolean;
/** Read cache without network (undefined when missing / stale / locale mismatch). */
export declare function peekWalletCache(locale: string | undefined): WalletSnapshot | undefined;
/** Drop cache (e.g. after forced refresh failure is optional; usually overwrite). */
export declare function clearWalletCache(): void;
/**
 * Load wallet status + balance, reusing a ≤1min cache unless `force`.
 * @param locale - UI locale forwarded to balance API.
 * @param force - bypass cache (manual「刷新」).
 */
export declare function loadWalletSnapshot(locale: string | undefined, force?: boolean): Promise<WalletSnapshot>;
//# sourceMappingURL=cache.d.ts.map