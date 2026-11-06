/** Occupy official onboarding sign-in + account-menu login with X6 OAuth. */

import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings-models/client'
import { useClientLocale } from '../use-client-locale.ts'
import { X6AccountLauncher } from './X6AccountLauncher.tsx'
import { X6SignInDialog } from './X6SignInDialog.tsx'

/** Onboarding step body: always X6 dialog (never official DeepSeek account / API-key editor). */
function X6OnboardingStep(props: {
  readonly ctx: ClientContext
  readonly complete: () => void
}) {
  const locale = useClientLocale(props.ctx)
  return (
    <X6SignInDialog
      ctx={props.ctx}
      locale={locale}
      complete={props.complete}
      useApiKey={props.complete}
      entry="onboarding"
    />
  )
}

/** Register sign-in slot, onboarding step, and launcher so every「登录」opens X6. */
export function registerSignIn(ctx: ClientContext): void {
  ctx.slots.inject('settings.models.sign-in', () => ctx.slots.register({
    name: 'settings.models.sign-in',
    priority: -1,
    registrant: '@x6_ai/dsh-plugin-x6-core',
  }, (owner) => (
    <X6SignInDialog
      ctx={ctx}
      locale={ctx.locale.getSnapshot().active}
      complete={owner.complete}
      useApiKey={owner.useApiKey}
      entry="onboarding"
    />
  )))

  // Shadow official `deepseek-official` onboarding so explicit openOnboarding
  // cannot jump to the DeepSeek API-key editor (explicit defaults apiKey=true).
  ctx.slots.inject('settings.onboarding', () => ctx.slots.register({
    name: 'settings.onboarding',
    id: 'deepseek-official',
    priority: -1,
    order: 0,
    registrant: '@x6_ai/dsh-plugin-x6-core',
  }, (owner) => (
    <X6OnboardingStep ctx={ctx} complete={owner.complete} />
  )))

  ctx.slots.inject('settings.launcher', () => ctx.slots.register({
    name: 'settings.launcher',
    priority: -1,
    registrant: '@x6_ai/dsh-plugin-x6-core',
  }, (owner) => <X6AccountLauncher ctx={ctx} {...owner} />))
}
