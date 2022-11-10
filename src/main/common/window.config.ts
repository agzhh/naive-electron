import { BrowserWindowConstructorOptions } from 'electron';

export const windowConfig: BrowserWindowConstructorOptions = {
  // show: false, // 默认不显示
  // frame: false, // 关闭窗口默认头部
  webPreferences: {
    // nativeWindowOpen: true,
    nodeIntegration: true, // common把 Node.js 环境集成到渲染进程中，
    webSecurity: false, // 禁用掉了浏览器的跨域安全特性（同源策略）
    /**
     * 禁用 webSecurity 将会禁止同源策略并且将 allowRunningInsecureContent 属性置 true。
     * 换句话说，这将使得来自其他站点的非安全代码被执行。
     * 默认情况下，Electron不允许网站在HTTPS中加载或执行非安全源(HTTP) 中的脚本代码、CSS或插件。
     * 将allowRunningInsecureContent属性设为true将禁用这种保护。
     */
    allowRunningInsecureContent: true,
    contextIsolation: false, // 在同一个 JavaScript 上下文中使用 Electron API。
    /**
     * 是否启用 <webview> tag标签. 默认值为 false.
     * 注意: 为 < webview> 配置的 preload 脚本在执行时将启用节点集成, 因此应确保远程或不受信任的内容无法创建恶意的 preload 脚本 。
     * 可以使用 webContents 上的 will-attach-webview 事件对 preload 脚本进行剥离, 并验证或更改 <webview> 的初始设置。
     */
    webviewTag: true,
    spellcheck: false, // 是否启用内置拼写检查器。 默认值为 true。
    disableHtmlFullscreenWindowResize: true // 是否阻止窗口在进入 HTML 全屏时调整大小。 默认值为 false.
  }
};
