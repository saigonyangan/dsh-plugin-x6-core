import type { Context as ClientContext } from '@deepseek-ai/cordis';
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client';
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import { type X6UiSettings } from '../../shared/settings-contract.ts';
export interface X6SettingsCardProps extends PropsRuntime<'plugins.item'>, PropsLocale<'x6.settings'> {
    readonly ctx: ClientContext;
    readonly scope: ConfigForm<X6UiSettings>;
}
/** Plugins page contribution: summary one-liner or full settings form. */
export declare function X6SettingsCard(props: X6SettingsCardProps): string | import("react").JSX.Element | null;
//# sourceMappingURL=X6SettingsCard.d.ts.map