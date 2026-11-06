import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client';
import type { Context as ClientContext } from '@deepseek-ai/cordis';
import type { X6UiSettings } from '../../shared/settings-contract.ts';
export interface SidebarFooterRootProps extends PropsRuntime<'sidebar.footer.action'> {
    readonly ctx: ClientContext;
    readonly settings: ConfigForm<X6UiSettings>;
}
/** Sidebar footer occupant for skill market (wallet lives in Settings). */
export declare function SidebarFooterRoot(props: SidebarFooterRootProps): import("react").JSX.Element;
//# sourceMappingURL=SidebarFooterRoot.d.ts.map