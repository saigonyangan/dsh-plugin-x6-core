/** In-memory wallet snapshot cache (1 minute). */

import { WALLET_POLL_MS, type WalletBalanceResponse, type WalletStatusResponse } from '../../shared/wallet-contract.ts'
import { fetchWalletBalance, fetchWalletStatus } from './wire.ts'

export interface WalletSnapshotOk {
  readonly kind: 'ok'
  readonly status: WalletStatusResponse
  readonly balance: WalletBalanceResponse
}

export interface WalletSnapshotMismatch {
  readonly kind: 'mismatch'
  readonly status: WalletStatusResponse
}

export type WalletSnapshot = WalletSnapshotOk | WalletSnapshotMismatch

interface CacheEntry {
  readonly localeKey: string
  readonly snapshot: WalletSnapshot
  readonly fetchedAt: number
}

let cache: CacheEntry | undefined

function localeKey(locale: string | undefined): string {
  return locale ?? ''
}

/** True when a fresh cache entry exists for this locale. */
export function hasFreshWalletCache(locale: string | undefined, now = Date.now()): boolean {
  if (cache === undefined) return false
  if (cache.localeKey !== localeKey(locale)) return false
  return now - cache.fetchedAt < WALLET_POLL_MS
}

/** Read cache without network (undefined when missing / stale / locale mismatch). */
export function peekWalletCache(locale: string | undefined): WalletSnapshot | undefined {
  if (!hasFreshWalletCache(locale)) return undefined
  return cache?.snapshot
}

/** Drop cache (e.g. after forced refresh failure is optional; usually overwrite). */
export function clearWalletCache(): void {
  cache = undefined
}

/**
 * Load wallet status + balance, reusing a ≤1min cache unless `force`.
 * @param locale - UI locale forwarded to balance API.
 * @param force - bypass cache (manual「刷新」).
 */
export async function loadWalletSnapshot(
  locale: string | undefined,
  force = false,
): Promise<WalletSnapshot> {
  if (!force) {
    const hit = peekWalletCache(locale)
    if (hit !== undefined) return hit
  }

  const status = await fetchWalletStatus()
  if (status.connected && status.credentialAligned === false) {
    const snapshot: WalletSnapshotMismatch = { kind: 'mismatch', status }
    cache = { localeKey: localeKey(locale), snapshot, fetchedAt: Date.now() }
    return snapshot
  }

  const balance = await fetchWalletBalance(locale)
  const snapshot: WalletSnapshotOk = { kind: 'ok', status, balance }
  cache = { localeKey: localeKey(locale), snapshot, fetchedAt: Date.now() }
  return snapshot
}
