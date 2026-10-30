/**
 * X6 platform core plugin, node half.
 * Orchestrates host features (settings, line probe, OAuth); browser UI ships via `./client`.
 */
import type { Context } from '@deepseek-ai/cordis';
import type { Config } from './host/config.ts';
export { Config, name, inject } from './host/config.ts';
/**
 * Register host routes and settings for X6 quick setup.
 * @param ctx - Host plugin context.
 * @param config - Cordis row configuration.
 */
export declare function apply(ctx: Context, config: Config): void;
//# sourceMappingURL=index.d.ts.map