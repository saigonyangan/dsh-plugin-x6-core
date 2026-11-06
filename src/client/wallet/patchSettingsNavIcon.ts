/** Swap the settings-nav gear for a wallet glyph on the X6 balance section. */

const NAV_LABELS = new Set(['用户余额', 'User balance'])

const WALLET_MARKUP = [
  '<rect x="1.5" y="3.5" width="13" height="9" rx="2" stroke="currentColor" stroke-width="1.3" fill="none"></rect>',
  '<path d="M1.5 6.5h13" stroke="currentColor" stroke-width="1.3" fill="none"></path>',
  '<circle cx="11.5" cy="9.5" r="1" fill="currentColor"></circle>',
].join('')

function isWalletNavButton(button: Element): boolean {
  const label = button.textContent?.replace(/\s+/g, ' ').trim() ?? ''
  return [...NAV_LABELS].some(name => label.includes(name))
}

/** Replace gear SVG inside the「用户余额」nav cell with a wallet outline. */
export function patchSettingsWalletNavIcon(root: ParentNode = document.body): void {
  const buttons = root.querySelectorAll('button')
  for (const button of buttons) {
    if (!isWalletNavButton(button)) continue
    const svg = button.querySelector('svg')
    if (svg === null) continue
    if (svg.dataset['x6WalletIcon'] === '1') continue
    svg.dataset['x6WalletIcon'] = '1'
    svg.setAttribute('viewBox', '0 0 16 16')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('aria-hidden', 'true')
    svg.innerHTML = WALLET_MARKUP
  }
}

/** Keep the wallet nav glyph in sync while Settings mounts. */
export function watchSettingsWalletNavIcon(): () => void {
  const run = () => { patchSettingsWalletNavIcon(document.body) }
  run()
  const observer = new MutationObserver(run)
  observer.observe(document.body, { childList: true, subtree: true, characterData: true })
  return () => observer.disconnect()
}
