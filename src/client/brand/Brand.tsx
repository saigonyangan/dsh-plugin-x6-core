import type { HeroBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { SidebarBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-sidebar/client'
import css from './brand.module.css'
import { X6_LOGO_MARK_DATA_URL } from './logo-data.ts'

type X6BrandMarkProps = HeroBrandMarkOwnerProps & SidebarBrandMarkOwnerProps

/**
 * Render the X6 mark with the presentation requested by its host surface.
 * @param props - Host-supplied mark presentation.
 * @returns the X6 logo mark.
 */
export function X6BrandMark({ size, className }: X6BrandMarkProps) {
  return (
    <img
      src={X6_LOGO_MARK_DATA_URL}
      width={size}
      height={size}
      className={className}
      alt=""
      aria-hidden
      style={{ display: 'block', flexShrink: 0, objectFit: 'contain' }}
    />
  )
}

/**
 * Render the X6 Harness wordmark without a subtitle row.
 * @returns the vertically centered brand name.
 */
export function X6BrandName() {
  return (
    <div className={css.brandNameStack}>
      <span className={css.wordmark} aria-label="X6 Harness">
        X6 Harness
      </span>
    </div>
  )
}
