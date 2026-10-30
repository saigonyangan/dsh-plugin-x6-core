import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client';
import type { Context as ClientContext } from '@deepseek-ai/cordis';
import type { X6UiSettings } from '../../shared/settings-contract.ts';
export interface SkillMarketRootProps extends PropsRuntime<'sidebar.footer.action'> {
    readonly ctx: ClientContext;
    readonly settings: ConfigForm<X6UiSettings>;
}
/** Sidebar footer trigger + skill market modal. */
export declare function SkillMarketRoot({ wide, ctx, settings }: SkillMarketRootProps): import("react").JSX.Element;
//# sourceMappingURL=SkillMarketRoot.d.ts.map