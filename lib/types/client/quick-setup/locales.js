/** Quick-setup copy keys. */
export const quickSetupMessages = {
    'zh-CN': {
        title: 'X6 快速配置',
        description: '登录授权后自动添加 X6 模型提供方，无需手填 API Key。',
        quickSetup: '快速配置',
        reopenAuth: '重新打开授权页',
        awaiting: '请在浏览器中完成授权…',
        writing: '正在写入模型提供方…',
        done: 'X6 已配置，可在上方列表中使用。',
        error: '配置失败',
        hostApiMissing: 'Host 端接口未就绪。请在插件目录执行 pnpm build，然后完全重启 dsh web / Desktop（仅刷新浏览器不够）。',
        unauthorized: '会话未授权，请关闭页面后用终端里带 ?token= 的 dsh web 地址重新打开。',
    },
    'en-US': {
        title: 'X6 Quick Setup',
        description: 'Sign in to add the X6 provider automatically — no API key typing.',
        quickSetup: 'Quick setup',
        reopenAuth: 'Reopen authorization',
        awaiting: 'Complete authorization in your browser…',
        writing: 'Writing model provider…',
        done: 'X6 is configured. Use it in the list above.',
        error: 'Setup failed',
        hostApiMissing: 'Host API is not ready. Run pnpm build in the plugin directory, then fully restart dsh web / Desktop (refreshing the browser is not enough).',
        unauthorized: 'Session is not authorized. Close this tab and reopen using the dsh web URL with ?token= from your terminal.',
    },
};
/** Resolve locale tag to a supported quick-setup dictionary. */
export function quickSetupT(locale) {
    const tag = locale?.startsWith('zh') ? 'zh-CN' : 'en-US';
    const dict = quickSetupMessages[tag];
    return key => dict[key];
}
//# sourceMappingURL=locales.js.map