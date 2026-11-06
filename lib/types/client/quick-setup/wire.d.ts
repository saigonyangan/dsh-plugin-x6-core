/** Browser fetch wrappers for X6 host API routes. */
import { type AuthApplyKeyResponse, type AuthStartResponse, type AuthStatusResponse } from '../../shared/auth-contract.ts';
/** Start OAuth flow; host resolves the pinned / auto region line. */
export declare function startAuth(locale?: string): Promise<AuthStartResponse>;
/** Poll auth flow status. */
export declare function fetchAuthStatus(flowId: string): Promise<AuthStatusResponse>;
/** Store a pasted X6 API key on Host and return provider write material. */
export declare function applyApiKey(apiKey: string): Promise<AuthApplyKeyResponse>;
//# sourceMappingURL=wire.d.ts.map