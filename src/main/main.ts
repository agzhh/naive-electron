import { app, BrowserWindow } from 'electron';
import { CustomScheme } from './CustomScheme';
import { CommonWindowEvent } from './CommonWindowEvent';
import { windowConfig } from '@/main/common/window.config';
import { CommonTray } from '@/main/CommonTray';

/**
 * ELECTRON_DISABLE_SECURITY_WARNINGS 用于设置渲染进程开发者调试工具的警告，这里设置为 true 就不会再显示任何警告了。
 * 如果渲染进程的代码可以访问 Node.js 的内置模块，而且渲染进程加载的页面（或脚本）是第三方开发的，
 * 那么恶意第三方就有可能使用 Node.js 的内置模块伤害最终用户 。
 * 这就是为什么这里要有这些警告的原因。如果你的应用不会加载任何第三方的页面或脚本。
 * 那么就不用担心这些安全问题啦。
 */
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

/**
 * 每当有一个窗口被创建成功后，这个事件就会被触发，
 */
app.on('browser-window-created', (e, win) => {
  // 监听窗口打开
  CommonWindowEvent.regWinEvent(win);
  // 注册窗口快捷键
  CommonWindowEvent.regShortcuts(win);
});

let mainWindow: BrowserWindow | null;

// 验证当前实例是唯一实例时会触发, 当判断方法被执行时，退出正在启动的应用
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

// 当 electron 初始化完成
app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    ...windowConfig,
    show: false,
    width: 800,
    height: 550,
    minWidth: 800,
    minHeight: 550
  });
  // mainWindow.setMenu(null); // 去除默认菜单栏
  // mainWindow.webContents.openDevTools({mode: 'undocked'}) // 打开调试控制台
  if (process.argv[2]) {
    mainWindow.loadURL(process.argv[2]);
  } else {
    CustomScheme.registerScheme();
    mainWindow.loadURL(`app://index.html`);
  }

  // 注册窗口监听事件, 全局只需要注册一次
  CommonWindowEvent.listen();

  // 为窗口添加系统托盘
  CommonTray.regWinTray(mainWindow);

  /**
   * 监听主窗口关闭
   */
  mainWindow.on('close', (event) => {
    event.preventDefault();
    mainWindow?.hide();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
