import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type { X6UiSettings } from '../../shared/settings-contract.ts'
import { SkillMarketRoot } from '../skill-market/SkillMarketRoot.tsx'
import { FooterErrorBoundary } from './FooterErrorBoundary.tsx'
import css from './sidebar-footer.module.css'

export interface SidebarFooterRootProps extends PropsRuntime<'sidebar.footer.action'> {
  readonly ctx: ClientContext
  readonly settings: ConfigForm<X6UiSettings>
}

/** Sidebar footer occupant for skill market (wallet lives in Settings). */
export function SidebarFooterRoot(props: SidebarFooterRootProps) {
  const { settings, ...rest } = props
  return (
    <div className={css.stack}>
      <FooterErrorBoundary label="skill-market">
        <SkillMarketRoot {...rest} settings={settings} />
      </FooterErrorBoundary>
    </div>
  )
}
