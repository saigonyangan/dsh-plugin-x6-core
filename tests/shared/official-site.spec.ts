import { describe, expect, it } from 'vitest'
import {
  OFFICIAL_SITE,
  buildOfficialSiteUrl,
  resolveOfficialSiteBase,
} from '../../src/shared/official-site.ts'

describe('official-site', () => {
  it('resolves a single official site', () => {
    expect(resolveOfficialSiteBase({ lineId: 'cn' })).toBe(OFFICIAL_SITE)
    expect(resolveOfficialSiteBase({ lineId: 'default' })).toBe(OFFICIAL_SITE)
    expect(resolveOfficialSiteBase({ lineOrigin: 'https://api.x6.ai' })).toBe(OFFICIAL_SITE)
    expect(resolveOfficialSiteBase({})).toBe(OFFICIAL_SITE)
  })

  it('appends locale path', () => {
    expect(buildOfficialSiteUrl({ locale: 'zh-CN' })).toBe(`${OFFICIAL_SITE}/zh`)
    expect(buildOfficialSiteUrl({ locale: 'en-US' })).toBe(`${OFFICIAL_SITE}/en`)
  })
})
