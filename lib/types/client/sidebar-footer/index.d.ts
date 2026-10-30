/** Combined sidebar footer: balance + skill market (single slot occupant). */
import type { Context as ClientContext } from '@deepseek-ai/cordis';
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client';
import type { X6UiSettings } from '../../shared/settings-contract.ts';
/**
 * Register one stacked footer action (avoids row-flex squeeze of two registrants).
 * Nested inject waits for `uiSession` + `modelDirectories` so WalletRoot can resolve
 * the active provider via `uiSession.adapter.current` (list.current is gone).
 */
export declare function registerSidebarFooter(ctx: ClientContext, settings: ConfigForm<X6UiSettings>): void;
//# sourceMappingURL=index.d.ts.map