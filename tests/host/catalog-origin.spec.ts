import { describe, expect, it } from 'vitest'
import {
  resolveConsoleOrigin,
  resolvePluginCatalogOrigin,
} from '../../src/host/plugin-market/catalog-origin.ts'
import type { SupaLine } from '../../src/shared/line.ts'

const line31002: SupaLine = {
  id: 'global',
  label: 'Global',
  origin: 'http://127.0.0.1:31002',
}

const globalProd: SupaLine = {
  id: 'global',
  label: 'Global',
  origin: 'https://x6-api.appexc.net',
  harnessOrigin: 'https://x6-harness-api.appexc.net',
  pluginCatalogOrigin: 'https://x6-console.appexc.net',
  consoleOrigin: 'https://x6-console.appexc.net',
}

const cnProd: SupaLine = {
  id: 'cn',
  label: '中国大陆',
  origin: 'https://x6-api.appexc.net',
  harnessOrigin: 'https://x6-harness-api.appexc.net',
  pluginCatalogOrigin: 'https://x6-console.appexc.net',
  consoleOrigin: 'https://x6-console.appexc.net',
}

describe('resolvePluginCatalogOrigin', () => {
  it('prefers per-line pluginCatalogOrigin', () => {
    expect(resolvePluginCatalogOrigin({
      pluginCatalogOrigin: 'https://fallback.example.com',
    }, globalProd)).toBe('https://x6-console.appexc.net')
    expect(resolvePluginCatalogOrigin({
      pluginCatalogOrigin: '',
    }, cnProd)).toBe('https://x6-console.appexc.net')
  })

  it('uses top-level pluginCatalogOrigin when line omits it', () => {
    expect(resolvePluginCatalogOrigin({
      pluginCatalogOrigin: 'https://client.example.com',
    }, line31002)).toBe('https://client.example.com')
  })

  it('maps local OpenAPI :31002 to gateway-client :31000', () => {
    expect(resolvePluginCatalogOrigin({
      pluginCatalogOrigin: '',
    }, line31002)).toBe('http://127.0.0.1:31000')
  })

  it('maps remote :31002 host to :31000', () => {
    expect(resolvePluginCatalogOrigin({
      pluginCatalogOrigin: '',
    }, {
      ...line31002,
      origin: 'http://172.31.30.133:31002',
    })).toBe('http://172.31.30.133:31000')
  })
})

describe('resolveConsoleOrigin', () => {
  it('prefers per-line consoleOrigin', () => {
    expect(resolveConsoleOrigin({ consoleOrigin: 'https://fallback.example.com' }, globalProd))
      .toBe('https://x6-console.appexc.net')
    expect(resolveConsoleOrigin({ consoleOrigin: '' }, cnProd))
      .toBe('https://x6-console.appexc.net')
  })

  it('falls back to top-level consoleOrigin', () => {
    expect(resolveConsoleOrigin({ consoleOrigin: 'http://localhost:5173' }, line31002))
      .toBe('http://localhost:5173')
  })
})
