/** X6 official marketing site. */
/** Production official site (x6 develop). */
export const OFFICIAL_SITE = 'https://x6.ai';
/**
 * Official site base. Dual-line .ai/.io selection removed for single-domain deploy.
 */
export function resolveOfficialSiteBase(_options = {}) {
    return OFFICIAL_SITE;
}
/**
 * Official site URL with locale path (`/zh` or `/en`), matching official site routing.
 */
export function buildOfficialSiteUrl(options = {}) {
    const base = resolveOfficialSiteBase(options);
    const segment = options.locale?.toLowerCase().startsWith('zh') ? 'zh' : 'en';
    return `${base}/${segment}`;
}
//# sourceMappingURL=official-site.js.map