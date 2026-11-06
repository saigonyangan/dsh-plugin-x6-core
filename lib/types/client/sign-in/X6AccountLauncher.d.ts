/** Sidebar account launcher: authorize / re-authorize opens X6 OAuth dialog. */
import type { Context as ClientContext } from '@deepseek-ai/cordis';
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
export type X6AccountLauncherProps = PropsRuntime<'settings.launcher'> & {
    readonly ctx: ClientContext;
};
/**
 * Signed-out-style launcher. Menu authorize item mounts {@link X6SignInDialog}
 * (avoids explicit `openOnboarding('deepseek-official')`, which skips the sign-in
 * slot and jumps to the official DeepSeek API-key editor).
 * Label switches to「重新授权」when an X6 API Key is already configured.
 */
export declare function X6AccountLauncher(props: X6AccountLauncherProps): import("react").JSX.Element;
//# sourceMappingURL=X6AccountLauncher.d.ts.map