import { app, BrowserWindow } from 'electron';
import { windowConfig } from '@/main/common/window.config';

/**
 * 设置渲染进程开发者调试工具的警告，这里设置为 true 就不会再显示任何警告了。
 * > 如果渲染进程的代码可以访问 Node.js 的内置模块，而且渲染进程加载的页面（或脚本）是第三方开发的，那么恶意第三方就有可能使用 Node.js 的内置模块伤害最终用户 。
 * > 这就是为什么这里要有这些警告的原因。如果你的应用不会加载任何第三方的页面或脚本。那么就不用担心这些安全问题啦。
 */
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

/**
 * mainWindow 被设置成一个全局变量，
 * 这样可以避免主窗口被 JavaScript 的垃圾回收器回收掉
 */
let mainWindow: BrowserWindow;

/**
 * app 是 Electron 的全局对象，用于控制整个应用程序的生命周期。
 * 在 Electron 初始化完成后，app 对象的 ready 事件被触发，
 * 这里我们使用 app.whenReady() 这个 Promise 方法来等待 ready 事件的发生
 */
void app.whenReady().then(() => {
  mainWindow = new BrowserWindow(windowConfig);
  // 打开调试窗口
  mainWindow.webContents.openDevTools({ mode: 'undocked' });
  void mainWindow.loadURL(process.argv[2]);
});
