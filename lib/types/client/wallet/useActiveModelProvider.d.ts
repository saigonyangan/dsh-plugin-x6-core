/** Subscribe to the active session's model provider (shared modelDirectories state). */
import type { Context as ClientContext } from '@deepseek-ai/cordis';
/**
 * Provider id of the currently opened session's model selection.
 * `undefined` while uiSession/modelDirectories are unavailable;
 * `null` when there is no current session or no selection yet.
 *
 * Navigation lives on `uiSession.adapter.current` (SessionList no longer
 * exposes `.current` after the Controller / ui-session split).
 */
export declare function useActiveModelProvider(ctx: ClientContext): string | null | undefined;
//# sourceMappingURL=useActiveModelProvider.d.ts.map