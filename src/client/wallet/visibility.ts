/** Derive whether the sidebar wallet should render. */

import { PROVIDER_ROUTE_ID } from '../../shared/provider.ts'

/**
 * Show wallet when the user preference allows it, X6 is connected,
 * and the active session model provider is the X6 route (`x6`).
 */
export function shouldShowWallet(
  connected: boolean,
  provider: string | null | undefined,
  showWallet = true,
): boolean {
  return showWallet && connected && provider === PROVIDER_ROUTE_ID
}
