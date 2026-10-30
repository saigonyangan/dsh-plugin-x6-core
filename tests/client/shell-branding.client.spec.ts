// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import {
  FAVICON_HREF,
  patchDocumentProductTitle,
  patchFavicon,
  PRODUCT_TITLE,
} from '../../src/client/brand/patchShellBranding.ts'

describe('patchTabBranding', () => {
  it('replaces the default product title and session suffixes', () => {
    document.title = 'DSH 本地构建'
    patchDocumentProductTitle()
    expect(document.title).toBe(PRODUCT_TITLE)

    document.title = '新会话 — DSH 本地构建'
    patchDocumentProductTitle()
    expect(document.title).toBe(`新会话 — ${PRODUCT_TITLE}`)
  })

  it('does not duplicate Harness when title already contains PRODUCT_TITLE', () => {
    document.title = PRODUCT_TITLE
    patchDocumentProductTitle()
    expect(document.title).toBe(PRODUCT_TITLE)

    document.title = 'X6 Harness Harness'
    patchDocumentProductTitle()
    expect(document.title).toBe(PRODUCT_TITLE)

    document.title = 'X6'
    patchDocumentProductTitle()
    expect(document.title).toBe(PRODUCT_TITLE)
  })

  it('installs the X6 favicon', () => {
    document.head.innerHTML = '<link rel="icon" type="image/svg+xml" href="/favicon.svg">'
    patchFavicon()
    const link = document.querySelector('link[rel="icon"]')
    expect(link?.getAttribute('href')?.startsWith('data:image/png;base64,')).toBe(true)
    expect(FAVICON_HREF.startsWith('data:image/png;base64,')).toBe(true)
  })
})
