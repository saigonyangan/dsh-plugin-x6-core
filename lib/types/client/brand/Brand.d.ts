import type { HeroBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client';
import type { SidebarBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-sidebar/client';
type X6BrandMarkProps = HeroBrandMarkOwnerProps & SidebarBrandMarkOwnerProps;
/**
 * Render the X6 mark with the presentation requested by its host surface.
 * @param props - Host-supplied mark presentation.
 * @returns the X6 logo mark.
 */
export declare function X6BrandMark({ size, className }: X6BrandMarkProps): import("react").JSX.Element;
/**
 * Render the X6 Harness wordmark without a subtitle row.
 * @returns the vertically centered brand name.
 */
export declare function X6BrandName(): import("react").JSX.Element;
export {};
//# sourceMappingURL=Brand.d.ts.map