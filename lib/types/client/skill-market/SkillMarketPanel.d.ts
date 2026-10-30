import type { SkillMarketState } from './useSkillMarket.ts';
export interface SkillMarketPanelProps {
    readonly state: SkillMarketState;
    readonly onClose: () => void;
    /** Resolved X6 official site (.ai / .io + locale). */
    readonly officialSiteUrl: string;
}
export declare function SkillMarketPanel({ state, onClose, officialSiteUrl }: SkillMarketPanelProps): import("react").JSX.Element;
//# sourceMappingURL=SkillMarketPanel.d.ts.map