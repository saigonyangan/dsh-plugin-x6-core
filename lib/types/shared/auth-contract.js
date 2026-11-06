/** Connection fetch routes. */
export const AUTH_START_PATH = '/api/x6.auth.start';
export const AUTH_STATUS_PATH = '/api/x6.auth.status';
/** Manual API key → store credential + return provider material. */
export const AUTH_APPLY_KEY_PATH = '/api/x6.auth.apply-key';
export function apiOk(data) {
    return { ok: true, ...data };
}
export function apiErr(message, code) {
    return { ok: false, message, ...code === undefined ? {} : { code } };
}
//# sourceMappingURL=auth-contract.js.map