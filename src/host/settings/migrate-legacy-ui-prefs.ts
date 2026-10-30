/**
 * Legacy brand settings migration removed for X6 greenfield installs.
 * Writes a one-shot marker so boot does not re-scan every time.
 */

import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { Context } from '@deepseek-ai/cordis'
import type { Config } from '../config.ts'

const MARKER_FILE = 'x6-core-ui-prefs.migrated'

/**
 * Mark migration complete without reading legacy settings sections.
 */
export async function migrateLegacyUiPrefs(ctx: Context, _config: Config): Promise<void> {
  const profile = ctx.get('profileContext')
  if (profile === undefined) return
  const marker = join(profile.home, MARKER_FILE)
  if (existsSync(marker)) return
  try {
    const { writeFileSync } = await import('node:fs')
    writeFileSync(marker, `${new Date().toISOString()}\n`, 'utf8')
  } catch {
    // ignore
  }
}
