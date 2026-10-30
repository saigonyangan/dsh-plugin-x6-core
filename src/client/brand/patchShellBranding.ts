/** Browser tab title + favicon overrides for X6. */

import { X6_LOGO_FAVICON_DATA_URL } from './logo-data.ts'

export const PRODUCT_TITLE = 'X6 Harness'

const TITLE_REPLACEMENTS = new Map([
  ['DSH 本地构建', PRODUCT_TITLE],
  ['DSH Local Build', PRODUCT_TITLE],
])

/** X6 mark used as the browser tab favicon. */
export const FAVICON_HREF = X6_LOGO_FAVICON_DATA_URL

let capturedTitle: string | undefined
let capturedFaviconHref: string | undefined

/** Collapse accidental "X6 Harness Harness" from naive short-name substitution. */
function normalizeProductTitle(title: string): string {
  let next = title
  // Never use replaceAll("X6" → "X6 Harness"): it rewrites inside PRODUCT_TITLE.
  while (next.includes(`${PRODUCT_TITLE} Harness`)) {
    next = next.replaceAll(`${PRODUCT_TITLE} Harness`, PRODUCT_TITLE)
  }
  while (next.includes('X6 Harness Harness')) {
    next = next.replaceAll('X6 Harness Harness', PRODUCT_TITLE)
  }
  if (next === 'X6' || next === 'X6 Harness Harness') return PRODUCT_TITLE
  if (next.endsWith(' — X6')) return `${next.slice(0, -' — X6'.length)} — ${PRODUCT_TITLE}`
  if (next.endsWith(' - X6')) return `${next.slice(0, -' - X6'.length)} - ${PRODUCT_TITLE}`
  return next
}

/** Keep the browser tab title on the X6 product name. */
export function patchDocumentProductTitle(): void {
  if (capturedTitle === undefined) capturedTitle = document.title
  let next = document.title
  for (const [from, to] of TITLE_REPLACEMENTS) {
    if (next.includes(from)) next = next.replaceAll(from, to)
  }
  next = normalizeProductTitle(next)
  if (next.length === 0) next = PRODUCT_TITLE
  if (next !== document.title) document.title = next
}

/** Replace the default DSH favicon with the X6 mark. */
export function patchFavicon(): void {
  const links = document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="shortcut icon"]')
  if (links.length === 0) {
    if (capturedFaviconHref === undefined) capturedFaviconHref = ''
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/png'
    link.href = FAVICON_HREF
    link.dataset.x6Favicon = '1'
    document.head.appendChild(link)
    return
  }
  for (const link of links) {
    if (capturedFaviconHref === undefined && link.href !== FAVICON_HREF) {
      capturedFaviconHref = link.href
    }
    if (link.href !== FAVICON_HREF) {
      link.type = 'image/png'
      link.href = FAVICON_HREF
      link.dataset.x6Favicon = '1'
    }
  }
}

/** Apply browser-tab-only branding patches. */
export function patchTabBranding(): void {
  patchDocumentProductTitle()
  patchFavicon()
}

/** Restore pre-X6 tab title / favicon (DSH defaults). */
export function clearTabBranding(): void {
  if (capturedTitle !== undefined && document.title !== capturedTitle) {
    document.title = capturedTitle
  }
  const injected = document.querySelectorAll<HTMLLinkElement>('link[data-x6-favicon="1"]')
  for (const link of injected) {
    if (capturedFaviconHref !== undefined && capturedFaviconHref.length > 0) {
      link.href = capturedFaviconHref
      delete link.dataset.x6Favicon
    } else {
      link.remove()
    }
  }
}

/** Keep the tab title and favicon in sync with framework updates. */
export function watchTabBrandingPatches(): () => void {
  const run = () => patchTabBranding()
  run()
  const observer = new MutationObserver(run)
  const title = document.querySelector('title')
  if (title !== null) {
    observer.observe(title, { childList: true, characterData: true, subtree: true })
  }
  if (document.head !== null) {
    observer.observe(document.head, { childList: true, subtree: true })
  }
  return () => observer.disconnect()
}
