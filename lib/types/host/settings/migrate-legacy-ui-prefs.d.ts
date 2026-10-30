/**
 * Legacy brand settings migration removed for X6 greenfield installs.
 * Writes a one-shot marker so boot does not re-scan every time.
 */
import type { Context } from '@deepseek-ai/cordis';
import type { Config } from '../config.ts';
/**
 * Mark migration complete without reading legacy settings sections.
 */
export declare function migrateLegacyUiPrefs(ctx: Context, _config: Config): Promise<void>;
//# sourceMappingURL=migrate-legacy-ui-prefs.d.ts.map