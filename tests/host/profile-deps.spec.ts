import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  readInstalledPackageVersion,
  resolveProfileDir,
} from '../../src/host/plugin-market/profile-deps.ts'

const previousHome = process.env.DSH_HOME

afterEach(() => {
  if (previousHome === undefined) delete process.env.DSH_HOME
  else process.env.DSH_HOME = previousHome
})

describe('profile-deps', () => {
  it('reads installed package version from profile node_modules', () => {
    const home = mkdtempSync(join(tmpdir(), 'dsh-profile-deps-'))
    process.env.DSH_HOME = home
    const profileDir = resolveProfileDir('web')
    mkdirSync(profileDir, { recursive: true })
    writeFileSync(join(profileDir, 'package.json'), JSON.stringify({
      dependencies: {
        '@x6_ai/dsh-plugin-demo': 'github:x6_ai/demo#main',
      },
    }))
    const packageDir = join(profileDir, 'node_modules', '@x6', 'dsh-plugin-demo')
    mkdirSync(packageDir, { recursive: true })
    writeFileSync(join(packageDir, 'package.json'), JSON.stringify({
      name: '@x6_ai/dsh-plugin-demo',
      version: '1.0.0',
    }))

    expect(readInstalledPackageVersion('web', '@x6_ai/dsh-plugin-demo')).toBe('1.0.0')
  })
})
