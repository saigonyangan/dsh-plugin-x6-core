import { type WalletBalanceResponse } from '../../shared/wallet-contract.ts';
export interface WalletPanelProps {
    readonly locale: string | undefined;
    readonly onClose: () => void;
    readonly onBalanceChange?: (balance: WalletBalanceResponse | undefined) => void;
    /** Settings page embed: no modal chrome / dialog role. */
    readonly embedded?: boolean;
}
/** Org-first wallet layout: primary org, then balance / points cards. */
export declare function WalletPanel({ locale, onClose, onBalanceChange, embedded }: WalletPanelProps): import("react").JSX.Element;
//# sourceMappingURL=WalletPanel.d.ts.map