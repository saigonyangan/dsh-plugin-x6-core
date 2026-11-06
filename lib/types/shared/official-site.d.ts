/** X6 official marketing site. */
/** Production official site (x6 develop). */
export declare const OFFICIAL_SITE: "https://x6.ai";
/**
 * Official site base. Dual-line .ai/.io selection removed for single-domain deploy.
 */
export declare function resolveOfficialSiteBase(_options?: {
    readonly lineId?: string | null;
    readonly lineOrigin?: string | null;
}): typeof OFFICIAL_SITE;
/**
 * Official site URL with locale path (`/zh` or `/en`), matching official site routing.
 */
export declare function buildOfficialSiteUrl(options?: {
    readonly lineId?: string | null;
    readonly lineOrigin?: string | null;
    readonly locale?: string | null;
}): string;
//# sourceMappingURL=official-site.d.ts.map