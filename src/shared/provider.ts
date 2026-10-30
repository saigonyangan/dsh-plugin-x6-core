/** Provider write targets in engine-standard settings / credentials storage. */

/** Settings namespace for pi-ai custom providers. */
export const PROVIDER_NS = 'llm-pi-ai' as const

/** Fixed route id for the X6 provider row. */
export const PROVIDER_ROUTE_ID = 'x6' as const

/** Credential ref written by Host; referenced in provider profile. */
export const CREDENTIAL_REF = 'X6_API_KEY' as const

/** Refresh token credential ref (Host-only, not in settings). */
export const REFRESH_CREDENTIAL_REF = 'X6_REFRESH_TOKEN' as const

/** Wire protocol for the custom provider profile. */
export const PROVIDER_API = 'openai-completions' as const

/** Display name shown in the Models list. */
export const PROVIDER_DISPLAY_NAME = 'X6' as const

/** OAuth callback path on the local dsh web server (exact route). */
export const OAUTH_CALLBACK_PATH = '/x6/oauth/callback' as const
