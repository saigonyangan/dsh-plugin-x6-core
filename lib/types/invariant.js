/**
 * Package-owned invariant companion for `@x6_ai/dsh-plugin-x6-core`.
 * dsh 0.2.1 起官方已移除 `@deepseek-ai/dsh-invariants`；保留空 companion 以免旧引用断裂。
 * @module @x6_ai/dsh-plugin-x6-core/invariant
 */
/** Cordis companion plugin name. */
export const name = 'x6-core-invariant';
/** No services required. */
export const inject = [];
/** No-op: package retains no mutable host state needing invariant checks. */
export function apply() { }
//# sourceMappingURL=invariant.js.map