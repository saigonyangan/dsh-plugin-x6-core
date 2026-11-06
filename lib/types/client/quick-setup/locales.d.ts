/** Quick-setup copy keys. */
export declare const quickSetupMessages: {
    readonly 'zh-CN': {
        readonly title: "X6 快速配置";
        readonly description: "登录授权后自动添加 X6 模型提供方。";
        readonly signInTitle: "开始使用";
        readonly signInDescription: "登录 X6 账号进行授权，即可开始使用。你的项目和文件保存在本地。";
        readonly later: "稍后";
        readonly close: "关闭";
        readonly cancel: "取消";
        readonly quickSetup: "快速配置";
        readonly signIn: "登录授权";
        readonly reopenAuth: "重新打开授权页";
        readonly copyLink: "复制 X6 登录链接";
        readonly copiedLink: "链接已复制";
        readonly awaiting: "请在浏览器中完成授权…";
        readonly browserTitle: "等待登录";
        readonly browserPrompt: "没有自动打开新页面？";
        readonly browserDescription: "，手动打开 X6 登录页完成登录。";
        readonly writing: "正在写入模型提供方…";
        readonly done: "X6 已配置，可在上方列表中使用。";
        readonly signInDone: "授权完成，正在进入…";
        readonly waiting: "等待授权";
        readonly retry: "重新登录";
        readonly error: "配置失败";
        readonly hostApiMissing: "Host 端接口未就绪。请在插件目录执行 pnpm build，然后完全重启 dsh web / Desktop（仅刷新浏览器不够）。";
        readonly unauthorized: "会话未授权，请关闭页面后用终端里带 ?token= 的 dsh web 地址重新打开。";
    };
    readonly 'en-US': {
        readonly title: "X6 Quick Setup";
        readonly description: "Sign in to authorize and add the X6 provider automatically.";
        readonly signInTitle: "Get started";
        readonly signInDescription: "Sign in to your X6 account to authorize and get started. Your projects and files are stored locally.";
        readonly later: "Later";
        readonly close: "Close";
        readonly cancel: "Cancel";
        readonly quickSetup: "Quick setup";
        readonly signIn: "Authorize";
        readonly reopenAuth: "Reopen authorization";
        readonly copyLink: "Copy X6 sign-in link";
        readonly copiedLink: "Link copied";
        readonly awaiting: "Complete authorization in your browser…";
        readonly browserTitle: "Waiting for sign in";
        readonly browserPrompt: "Page did not open automatically? ";
        readonly browserDescription: ", then open the X6 sign-in page to finish.";
        readonly writing: "Writing model provider…";
        readonly done: "X6 is configured. Use it in the list above.";
        readonly signInDone: "Authorized. Entering…";
        readonly waiting: "Waiting";
        readonly retry: "Sign in again";
        readonly error: "Setup failed";
        readonly hostApiMissing: "Host API is not ready. Run pnpm build in the plugin directory, then fully restart dsh web / Desktop (refreshing the browser is not enough).";
        readonly unauthorized: "Session is not authorized. Close this tab and reopen using the dsh web URL with ?token= from your terminal.";
    };
};
export type QuickSetupLocale = keyof typeof quickSetupMessages;
export type QuickSetupKey = keyof typeof quickSetupMessages['zh-CN'];
/** Resolve locale tag to a supported quick-setup dictionary. */
export declare function quickSetupT(locale: string | undefined): (key: QuickSetupKey) => string;
//# sourceMappingURL=locales.d.ts.map