import type { SkillMarketState } from './useSkillMarket.ts';
export interface SkillMarketPanelProps {
    readonly state: SkillMarketState;
    readonly onClose: () => void;
    /** Resolved X6 official site (.ai / .io + locale). */
    readonly officialSiteUrl: string;
    /** Main-panel embed: fill the frame instead of floating as a modal. */
    readonly embedded?: boolean;
}
export declare function SkillMarketPanel({ state, onClose, officialSiteUrl, embedded, }: SkillMarketPanelProps): import("react").JSX.Element;
//# sourceMappingURL=SkillMarketPanel.d.ts.map