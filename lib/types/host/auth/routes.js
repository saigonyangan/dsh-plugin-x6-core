/** Host HTTP routes: connection.fetch API + OAuth callback. */
import { randomUUID } from 'node:crypto';
import { credentialRef } from '@deepseek-ai/dsh-credentials';
import { AUTH_APPLY_KEY_PATH, AUTH_START_PATH, AUTH_STATUS_PATH, apiErr, apiOk, } from "../../shared/auth-contract.js";
import { dataPlaneBase } from "../../shared/line.js";
import { CREDENTIAL_REF, OAUTH_CALLBACK_PATH } from "../../shared/provider.js";
import { resolveAuthLine } from "../line/resolver.js";
import { ensureDeviceIdentity } from "../settings/device.js";
import { challengeFromVerifier, generateState, generateVerifier, } from "./pkce.js";
import { buildAuthorizeUrl, requireModelsForKey } from "./harness-client.js";
import { createFlow, getFlow, } from "./flow-store.js";
import { handleOAuthCallback } from "./callback.js";
function jsonResponse(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}
function flowStatus(flow) {
    if (flow.phase === 'done' && flow.result !== undefined) {
        return {
            phase: 'done',
            flowId: flow.flowId,
            line: flow.result.line,
            baseURL: flow.result.baseURL,
            models: flow.result.models,
            credentialRef: flow.result.credentialRef,
        };
    }
    if (flow.phase === 'error') {
        return {
            phase: 'error',
            flowId: flow.flowId,
            message: flow.errorMessage ?? '授权失败。',
        };
    }
    return {
        phase: flow.phase,
        flowId: flow.flowId,
        authorizeUrl: flow.authorizeUrl,
        line: flow.line,
    };
}
/** Register plugin API routes and OAuth callback on the host. */
export function registerAuthRoutes(ctx, config) {
    const redirectUri = () => `http://127.0.0.1:${ctx.webServer.port}${OAUTH_CALLBACK_PATH}`;
    ctx.effect(() => ctx.connection.fetch.register({
        path: AUTH_START_PATH,
        methods: ['GET'],
        requestBody: 'buffered',
        fetch: async (request) => {
            try {
                const url = new URL(request.url);
                const locale = url.searchParams.get('locale') ?? undefined;
                const { winner } = await resolveAuthLine(ctx, config);
                const verifier = generateVerifier();
                const challenge = challengeFromVerifier(verifier);
                const state = generateState();
                const flowId = randomUUID();
                const { deviceName } = await ensureDeviceIdentity(ctx, config);
                const uri = redirectUri();
                const authorizeUrl = buildAuthorizeUrl(winner.line, {
                    redirectUri: uri,
                    codeChallenge: challenge,
                    state,
                    deviceName,
                    ...(locale !== undefined ? { locale } : {}),
                });
                createFlow({
                    flowId,
                    line: winner.line,
                    verifier,
                    state,
                    redirectUri: uri,
                    authorizeUrl,
                    ...(locale !== undefined ? { locale } : {}),
                });
                // Prefer the console login page for clipboard copy when authorize redirects there.
                let copyUrl;
                try {
                    const probe = await fetch(authorizeUrl, { method: 'GET', redirect: 'manual' });
                    const location = probe.headers.get('location');
                    if (location !== null && location.length > 0) {
                        copyUrl = new URL(location, authorizeUrl).href;
                    }
                }
                catch {
                    // keep authorizeUrl only
                }
                const body = apiOk({
                    flowId,
                    authorizeUrl,
                    ...(copyUrl === undefined ? {} : { copyUrl }),
                    line: winner.line,
                    latencyMs: winner.latencyMs,
                });
                return jsonResponse(body);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : '无法启动授权。';
                return jsonResponse(apiErr(message), 400);
            }
        },
    }), 'x6: auth.start');
    ctx.effect(() => ctx.connection.fetch.register({
        path: AUTH_STATUS_PATH,
        methods: ['GET'],
        requestBody: 'buffered',
        fetch: async (request) => {
            const flowId = new URL(request.url).searchParams.get('flowId') ?? '';
            const flow = getFlow(flowId);
            if (flow === undefined) {
                return jsonResponse(apiErr('授权流程不存在或已过期。'), 404);
            }
            return jsonResponse(apiOk(flowStatus(flow)));
        },
    }), 'x6: auth.status');
    ctx.effect(() => ctx.connection.fetch.register({
        path: AUTH_APPLY_KEY_PATH,
        methods: ['POST'],
        requestBody: 'buffered',
        fetch: async (request) => {
            try {
                const body = await request.json();
                const apiKey = typeof body.apiKey === 'string' ? body.apiKey.trim() : '';
                if (apiKey.length === 0) {
                    return jsonResponse(apiErr('请输入 API Key。'), 400);
                }
                const { winner } = await resolveAuthLine(ctx, config);
                const models = await requireModelsForKey(winner.line, apiKey);
                await ctx.credentials.set(credentialRef(CREDENTIAL_REF), apiKey);
                const payload = apiOk({
                    baseURL: dataPlaneBase(winner.line),
                    models,
                    credentialRef: CREDENTIAL_REF,
                    line: winner.line,
                    latencyMs: winner.latencyMs,
                });
                return jsonResponse(payload);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : '无法应用 API Key。';
                return jsonResponse(apiErr(message), 400);
            }
        },
    }), 'x6: auth.apply-key');
    ctx.effect(() => ctx.webServer.register({
        kind: 'exact',
        path: OAUTH_CALLBACK_PATH,
        handler: (req, res) => { void handleOAuthCallback(ctx, config, req, res); },
    }), 'x6: oauth callback');
}
//# sourceMappingURL=routes.js.map