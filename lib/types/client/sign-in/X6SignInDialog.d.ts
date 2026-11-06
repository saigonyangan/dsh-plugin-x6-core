/** X6 authorize dialog: OAuth only (no manual API Key path). */
import type { Context as ClientContext } from '@deepseek-ai/cordis';
export interface X6SignInDialogProps {
    readonly ctx: ClientContext;
    readonly locale: string | undefined;
    readonly complete: () => void;
    /** Kept for slot compatibility with official SignInDialog owner props. */
    readonly useApiKey: () => void;
    /**
     * `onboarding` — first-run guidance; dismissed immediately when X6 API Key exists.
     * `menu` — account menu authorize / re-authorize; skips intro and starts OAuth when key exists.
     */
    readonly entry?: 'onboarding' | 'menu';
}
/** Blocking X6 authorize modal occupying `settings.models.sign-in`. */
export declare function X6SignInDialog(props: X6SignInDialogProps): import("react").JSX.Element | null;
//# sourceMappingURL=X6SignInDialog.d.ts.map