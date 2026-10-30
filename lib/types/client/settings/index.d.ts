/** Register the X6 card on the Plugins page. */
import type { Context as ClientContext } from '@deepseek-ai/cordis';
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client';
import { type X6UiSettings } from '../../shared/settings-contract.ts';
import { zh } from './locales.ts';
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        'x6.settings': keyof typeof zh;
    }
}
/** Register `plugins.item` while Host serves the X6 volatile Config. */
export declare function registerPluginSettings(ctx: ClientContext, scope: ConfigForm<X6UiSettings>): void;
//# sourceMappingURL=index.d.ts.map