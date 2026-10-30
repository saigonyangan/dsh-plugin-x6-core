import type { Context as ClientContext } from '@deepseek-ai/cordis';
import type { HeroBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client';
import type { SidebarBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-sidebar/client';
type X6BrandMarkProps = HeroBrandMarkOwnerProps & SidebarBrandMarkOwnerProps;
export interface X6BrandNameProps {
    readonly locale: string | undefined;
}
/**
 * Render the X6 mark with the presentation requested by its host surface.
 * @param props - Host-supplied mark presentation.
 * @returns the X6 logo mark.
 */
export declare function X6BrandMark({ size, className }: X6BrandMarkProps): import("react").JSX.Element;
/**
 * Render the X6 wordmark and console subtitle without its slotted mark.
 * @returns the X6 brand name stack.
 */
export declare function X6BrandName({ locale }: X6BrandNameProps): import("react").JSX.Element;
export declare function X6BrandNameSlot({ ctx }: {
    readonly ctx: ClientContext;
}): import("react").JSX.Element;
export {};
//# sourceMappingURL=Brand.d.ts.map