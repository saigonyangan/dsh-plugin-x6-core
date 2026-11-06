/** Wallet sidebar locale dictionary. */
const zh = {
    nav: '用户余额',
    title: 'X6 余额',
    close: '关闭',
    tabAccount: '账户',
    tabSubscription: '订阅',
    balanceLabel: '账户余额',
    pointsLabel: '剩余积分',
    pointsGrantedLabel: '本周期额度',
    orgLabel: '组织',
    resetAtLabel: '下次积分重置',
    periodEndLabel: '周期结束',
    refresh: '刷新',
    loading: '正在加载余额…',
    configureBudget: '配置预算',
    budgetHint: '配额预算请登录到控制台中进行配置',
    reauthHint: '会话已失效。请打开设置 → 模型，重新执行 X6 快速配置。',
    keyMismatchHint: 'API Key 已变更，请打开设置 → 模型，重新执行 X6 快速配置。',
    reconfigureNeeded: '需重新配置',
    hostApiMissing: 'Host 余额接口未加载。请在插件目录执行 pnpm build 后完全重启 dsh web。',
    error: '无法获取余额。',
    notConnected: '尚未配置 X6。',
};
const en = {
    nav: 'User balance',
    title: 'X6 balance',
    close: 'Close',
    tabAccount: 'Account',
    tabSubscription: 'Subscription',
    balanceLabel: 'Account balance',
    pointsLabel: 'Points remaining',
    pointsGrantedLabel: 'Period grant',
    orgLabel: 'Organization',
    resetAtLabel: 'Next points reset',
    periodEndLabel: 'Period ends',
    refresh: 'Refresh',
    loading: 'Loading balance…',
    configureBudget: 'Configure budget',
    budgetHint: 'Sign in to the console to configure quota budgets.',
    reauthHint: 'Session expired. Open Settings → Models and run X6 Quick Setup again.',
    keyMismatchHint: 'API key changed. Open Settings → Models and run X6 Quick Setup again.',
    reconfigureNeeded: 'Reconfigure',
    hostApiMissing: 'Host wallet API is missing. Run pnpm build in the plugin directory, then fully restart dsh web.',
    error: 'Could not load balance.',
    notConnected: 'X6 is not configured yet.',
};
/** Resolve locale tag to wallet dictionary accessor. */
export function walletT(locale) {
    const dict = locale?.startsWith('zh') ? zh : en;
    return (key) => dict[key];
}
//# sourceMappingURL=locales.js.map