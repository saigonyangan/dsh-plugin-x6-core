/** Plugin cordis config schema and defaults. */
import z from '@deepseek-ai/schemastery';
const lineSchema = z.object({
    id: z.string().required(),
    label: z.string().required(),
    origin: z.string().required(),
    harnessOrigin: z.string(),
    pluginCatalogOrigin: z.string(),
    consoleOrigin: z.string(),
});
export const DEFAULT_LINES = [
    {
        id: 'default',
        label: 'X6',
        origin: 'https://api.x6.ai',
        harnessOrigin: 'https://harness-api.x6.ai',
        pluginCatalogOrigin: 'https://client-api.x6.ai',
        consoleOrigin: 'https://client-api.x6.ai',
    },
];
export const Config = z.object({
    lines: z.array(lineSchema).default([
        {
            id: 'default',
            label: 'X6',
            origin: 'https://api.x6.ai',
            harnessOrigin: 'https://harness-api.x6.ai',
            pluginCatalogOrigin: 'https://client-api.x6.ai',
            consoleOrigin: 'https://client-api.x6.ai',
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
});
/** Cordis function-plugin name. */
export const name = 'x6-core';
/** Host services required before routes and settings writes. */
export const inject = ['webServer', 'connection', 'credentials', 'settings'];
//# sourceMappingURL=config.js.map