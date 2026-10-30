import { describe, expect, it } from 'vitest'
import { shouldShowWallet } from '../../src/client/wallet/visibility.ts'

describe('shouldShowWallet', () => {
  it('hides when not connected', () => {
    expect(shouldShowWallet(false, 'x6')).toBe(false)
  })

  it('hides for non-X6 providers', () => {
    expect(shouldShowWallet(true, 'deepseek-official')).toBe(false)
    expect(shouldShowWallet(true, null)).toBe(false)
    expect(shouldShowWallet(true, undefined)).toBe(false)
  })

  it('shows only when connected, provider is x6, and pref is on', () => {
    expect(shouldShowWallet(true, 'x6', true)).toBe(true)
  })

  it('hides when the plugin setting disables the balance module', () => {
    expect(shouldShowWallet(true, 'x6', false)).toBe(false)
  })

  it('defaults showWallet to true when omitted', () => {
    expect(shouldShowWallet(true, 'x6')).toBe(true)
  })
})
