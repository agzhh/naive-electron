import { app, BrowserWindow } from 'electron';

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
app.whenReady().then(() => {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(process.argv[2]);
});
