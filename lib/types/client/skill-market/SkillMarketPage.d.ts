/** Main-panel body for the X6 app marketplace. */
import type { Context as ClientContext } from '@deepseek-ai/cordis';
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client';
import type { X6UiSettings } from '../../shared/settings-contract.ts';
export interface SkillMarketPageProps {
    readonly ctx: ClientContext;
    readonly settings: ConfigForm<X6UiSettings>;
}
/** Full-page skill market opened from the sidebar「应用」entry. */
export declare function SkillMarketPage({ ctx, settings }: SkillMarketPageProps): import("react").JSX.Element;
export declare function SkillMarketPanelIcon(props: {
    readonly size: number;
    readonly active: boolean;
}): import("react").JSX.Element;
//# sourceMappingURL=SkillMarketPage.d.ts.map