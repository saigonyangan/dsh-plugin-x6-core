/** Quick-setup copy keys. */

export const quickSetupMessages = {
  'zh-CN': {
    title: 'X6 快速配置',
    description: '登录授权后自动添加 X6 模型提供方。',
    signInTitle: '开始使用',
    signInDescription: '登录 X6 账号进行授权，即可开始使用。你的项目和文件保存在本地。',
    later: '稍后',
    close: '关闭',
    cancel: '取消',
    quickSetup: '快速配置',
    signIn: '登录授权',
    reopenAuth: '重新打开授权页',
    copyLink: '复制 X6 登录链接',
    copiedLink: '链接已复制',
    awaiting: '请在浏览器中完成授权…',
    browserTitle: '等待登录',
    browserPrompt: '没有自动打开新页面？',
    browserDescription: '，手动打开 X6 登录页完成登录。',
    writing: '正在写入模型提供方…',
    done: 'X6 已配置，可在上方列表中使用。',
    signInDone: '授权完成，正在进入…',
    waiting: '等待授权',
    retry: '重新登录',
    error: '配置失败',
    hostApiMissing: 'Host 端接口未就绪。请在插件目录执行 pnpm build，然后完全重启 dsh web / Desktop（仅刷新浏览器不够）。',
    unauthorized: '会话未授权，请关闭页面后用终端里带 ?token= 的 dsh web 地址重新打开。',
  },
  'en-US': {
    title: 'X6 Quick Setup',
    description: 'Sign in to authorize and add the X6 provider automatically.',
    signInTitle: 'Get started',
    signInDescription: 'Sign in to your X6 account to authorize and get started. Your projects and files are stored locally.',
    later: 'Later',
    close: 'Close',
    cancel: 'Cancel',
    quickSetup: 'Quick setup',
    signIn: 'Authorize',
    reopenAuth: 'Reopen authorization',
    copyLink: 'Copy X6 sign-in link',
    copiedLink: 'Link copied',
    awaiting: 'Complete authorization in your browser…',
    browserTitle: 'Waiting for sign in',
    browserPrompt: 'Page did not open automatically? ',
    browserDescription: ', then open the X6 sign-in page to finish.',
    writing: 'Writing model provider…',
    done: 'X6 is configured. Use it in the list above.',
    signInDone: 'Authorized. Entering…',
    waiting: 'Waiting',
    retry: 'Sign in again',
    error: 'Setup failed',
    hostApiMissing: 'Host API is not ready. Run pnpm build in the plugin directory, then fully restart dsh web / Desktop (refreshing the browser is not enough).',
    unauthorized: 'Session is not authorized. Close this tab and reopen using the dsh web URL with ?token= from your terminal.',
  },
} as const

export type QuickSetupLocale = keyof typeof quickSetupMessages
export type QuickSetupKey = keyof typeof quickSetupMessages['zh-CN']

/** Resolve locale tag to a supported quick-setup dictionary. */
export function quickSetupT(locale: string | undefined): (key: QuickSetupKey) => string {
  const tag = locale?.startsWith('zh') ? 'zh-CN' : 'en-US'
  const dict = quickSetupMessages[tag]
  return key => dict[key]
}
