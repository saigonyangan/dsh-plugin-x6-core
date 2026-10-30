import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client';
import type { Context as ClientContext } from '@deepseek-ai/cordis';
import type { X6UiSettings } from '../../shared/settings-contract.ts';
export interface WalletRootProps extends PropsRuntime<'sidebar.footer.action'> {
    readonly ctx: ClientContext;
    readonly settings: ConfigForm<X6UiSettings>;
}
/**
 * Sidebar balance row (amount as label) + detail modal.
 * Visible when the plugin setting allows it, X6 is connected, and the
 * active session's model provider is `x6`.
 */
export declare function WalletRoot({ wide, ctx, settings }: WalletRootProps): import("react").JSX.Element | null;
//# sourceMappingURL=WalletRoot.d.ts.map