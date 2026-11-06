/** Main-panel body for the X6 app marketplace. */

import { useMemo, useSyncExternalStore } from 'react'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import { buildOfficialSiteUrl } from '../../shared/official-site.ts'
import type { X6UiSettings } from '../../shared/settings-contract.ts'
import { useActiveLineId } from '../settings/useShowWalletPref.ts'
import { useClientLocale } from '../use-client-locale.ts'
import { PANEL_ID } from './panel-id.ts'
import { SkillMarketPanel } from './SkillMarketPanel.tsx'
import { useSkillMarket } from './useSkillMarket.ts'

export interface SkillMarketPageProps {
  readonly ctx: ClientContext
  readonly settings: ConfigForm<X6UiSettings>
}

/** Full-page skill market opened from the sidebar「应用」entry. */
export function SkillMarketPage({ ctx, settings }: SkillMarketPageProps) {
  const locale = useClientLocale(ctx)
  const lineId = useActiveLineId(settings)
  const officialSiteUrl = useMemo(
    () => buildOfficialSiteUrl({ lineId, locale: locale ?? null }),
    [lineId, locale],
  )
  const activePanelId = useSyncExternalStore(
    (onStoreChange) => ctx.layout.panelInfo.subscribe(onStoreChange),
    () => ctx.layout.panelInfo.getSnapshot().activePanelId,
    () => null,
  )
  const active = activePanelId === PANEL_ID
  const state = useSkillMarket({ ctx, locale, open: active })

  return (
    <SkillMarketPanel
      state={state}
      officialSiteUrl={officialSiteUrl}
      embedded
      onClose={() => { ctx.layout.selectPanel(null) }}
    />
  )
}

export function SkillMarketPanelIcon(props: {
  readonly size: number
  readonly active: boolean
}) {
  const { size } = props
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="2" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9" y="2" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2" y="9" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9" y="9" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}
