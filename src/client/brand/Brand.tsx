import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type { HeroBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { SidebarBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-sidebar/client'
import { useClientLocale } from '../use-client-locale.ts'
import css from './brand.module.css'
import { brandT } from './locales.ts'
import { X6_LOGO_MARK_DATA_URL } from './logo-data.ts'

type X6BrandMarkProps = HeroBrandMarkOwnerProps & SidebarBrandMarkOwnerProps

export interface X6BrandNameProps {
  readonly locale: string | undefined
}

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
 * Render the X6 wordmark and console subtitle without its slotted mark.
 * @returns the X6 brand name stack.
 */
export function X6BrandName({ locale }: X6BrandNameProps) {
  const t = brandT(locale)
  return (
    <div className={css.brandNameStack}>
      <span className={css.wordmark} aria-label="X6">
        X6
      </span>
      <span className={css.subtitle}>
        {t('subtitle')}
      </span>
    </div>
  )
}

export function X6BrandNameSlot({ ctx }: { readonly ctx: ClientContext }) {
  const locale = useClientLocale(ctx)
  return <X6BrandName locale={locale} />
}
