/** Browser fetch wrappers for X6 host API routes. */
import { AUTH_APPLY_KEY_PATH, AUTH_START_PATH, AUTH_STATUS_PATH, } from "../../shared/auth-contract.js";
async function readResponseBody(response) {
    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
        return response.json();
    }
    const text = await response.text();
    if (text.length === 0)
        return {};
    try {
        return JSON.parse(text);
    }
    catch {
        return { message: text };
    }
}
async function parseJson(response) {
    const body = await readResponseBody(response);
    if (!response.ok || body.ok === false) {
        if (response.status === 404) {
            throw new Error(typeof body.message === 'string' && body.message.length > 0
                ? body.message
                : 'HOST_API_NOT_FOUND');
        }
        const message = typeof body.message === 'string' && body.message.length > 0
            ? body.message
            : `HTTP ${String(response.status)}`;
        throw new Error(message);
    }
    return body;
}
/** Start OAuth flow; host resolves the pinned / auto region line. */
export async function startAuth(locale) {
    const url = new URL(AUTH_START_PATH, window.location.origin);
    if (locale !== undefined && locale.length > 0)
        url.searchParams.set('locale', locale);
    const response = await fetch(url);
    return parseJson(response);
}
/** Poll auth flow status. */
export async function fetchAuthStatus(flowId) {
    const url = new URL(AUTH_STATUS_PATH, window.location.origin);
    url.searchParams.set('flowId', flowId);
    const response = await fetch(url);
    return parseJson(response);
}
/** Store a pasted X6 API key on Host and return provider write material. */
export async function applyApiKey(apiKey) {
    const response = await fetch(new URL(AUTH_APPLY_KEY_PATH, window.location.origin), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
    });
    return parseJson(response);
}
//# sourceMappingURL=wire.js.map