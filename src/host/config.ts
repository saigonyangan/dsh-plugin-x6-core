/** Plugin cordis config schema and defaults. */

import type { Volatile } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import type { SupaLine } from '../shared/line.ts'

const lineSchema = z.object({
  id: z.string().required(),
  label: z.string().required(),
  origin: z.string().required(),
  harnessOrigin: z.string(),
  pluginCatalogOrigin: z.string(),
  consoleOrigin: z.string(),
})

/**
 * Resolved plugin configuration from cordis.patch.yml.
 * Runtime-writable prefs are `Volatile` so Host `settings.update(entryId, …)`
 * and Client `configForms` can project them (dsh ≥ 0.1.7).
 */
export interface Config {
  lines: SupaLine[]
  /**
   * Non-volatile region lock from the bundle patch. When non-empty, the
   * settings UI disables switching (same role as pre-0.1.7 `config.pinnedLine`).
   */
  forcePinnedLine: string
  /** User / auto-probe region pin (line id; single-line deploy uses `default`). */
  pinnedLine: Volatile<string>
  probeTimeoutMs: number
  probeCacheTtlMs: number
  deviceName: Volatile<string>
  /** Profile name for `dsh plugin add` (default web). */
  profileName: string
  /** Optional absolute path to dsh CLI bin.js. */
  dshCliEntry: string
  /**
   * Fallback gateway-client root when a line omits `pluginCatalogOrigin`.
   */
  pluginCatalogOrigin: string
  /**
   * Fallback console origin when a line omits `consoleOrigin`.
   */
  consoleOrigin: string
  deviceId: Volatile<string>
  resolvedLine: Volatile<string>
  resolvedAt: Volatile<number>
  latencyMs: Volatile<number>
  apiKeyId: Volatile<string>
  keyPrefix: Volatile<string>
  connectedAt: Volatile<number>
  /**
   * When false, hide the sidebar balance module.
   * Default true: still gated by connection + active X6 provider.
   */
  showWallet: Volatile<boolean>
  /** When false, hide X6 brand chrome (default true). */
  showBrand: Volatile<boolean>
}

export const DEFAULT_LINES: SupaLine[] = [
  {
    id: 'default',
    label: 'X6',
    origin: 'https://x6-api.appexc.net',
    harnessOrigin: 'https://x6-harness-api.appexc.net',
    pluginCatalogOrigin: 'https://x6-console.appexc.net',
    consoleOrigin: 'https://x6-console.appexc.net',
  },
]

export const Config: z<Config> = z.object({
  lines: z.array(lineSchema).default([
    {
      id: 'default',
      label: 'X6',
      origin: 'https://x6-api.appexc.net',
      harnessOrigin: 'https://x6-harness-api.appexc.net',
      pluginCatalogOrigin: 'https://x6-console.appexc.net',
      consoleOrigin: 'https://x6-console.appexc.net',
    },
  ]),
  forcePinnedLine: z.string().default(''),
  pinnedLine: z.string().default('').volatile(),
  probeTimeoutMs: z.number().step(1).min(500).max(30_000).default(2500),
  probeCacheTtlMs: z.number().step(1).min(0).max(3_600_000).default(600_000),
  deviceName: z.string().default('').volatile(),
  profileName: z.string().default('web'),
  dshCliEntry: z.string().default(''),
  pluginCatalogOrigin: z.string().default(''),
  consoleOrigin: z.string().default(''),
  deviceId: z.string().default('').volatile(),
  resolvedLine: z.string().default('').volatile(),
  resolvedAt: z.number().default(0).volatile(),
  latencyMs: z.number().default(0).volatile(),
  apiKeyId: z.string().default('').volatile(),
  keyPrefix: z.string().default('').volatile(),
  connectedAt: z.number().default(0).volatile(),
  showWallet: z.boolean().default(true).volatile(),
  showBrand: z.boolean().default(true).volatile(),
})

/** Cordis function-plugin name. */
export const name = 'x6-core'

/** Host services required before routes and settings writes. */
export const inject = ['webServer', 'connection', 'credentials', 'settings'] as const
