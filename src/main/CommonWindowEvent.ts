import { BrowserWindow, ipcMain, app, Menu, MenuItem, MenuItemConstructorOptions, shell, dialog, OpenDialogSyncOptions } from 'electron';
import { windowConfig } from '@/main/common/window.config';
import { getConfig } from '@/main/common/conf';
import { mainLogger } from '@/main/common/log';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CommonWindowEvent {
  /**
   * 返回 BrowserWindow | null
   * - 返回拥有给定 webContents的窗口，否则如果内容不属于一个窗口，返回null。
   * @param event
   * @private
   */
  private static getWin(event: any): BrowserWindow | null {
    // event.sender 返回发送消息的 webContents
    return BrowserWindow.fromWebContents(event.sender);
  }

  /**
   * 为窗口注册快捷键
   * @param win
   */
  public static regShortcuts(win: BrowserWindow): void {
    const menu: Array<MenuItemConstructorOptions | MenuItem> = [
      {
        label: '工具',
        submenu: [
          {
            label: '重新加载',
            accelerator: 'CommandOrControl+Shift+f5',
            role: 'reload'
          },
          {
            label: '打开调试工具',
            accelerator: 'CommandOrControl+Shift+f12',
            click: () => {
              win.webContents.openDevTools(); // 通过主进程共享的mainWindow打开调试工具
            }
          }
        ]
      }
    ];

    /* 设置右键菜单 */
    // 得到菜单模板
    const menuTemp = Menu.buildFromTemplate(menu);
    win.setMenu(menuTemp);
  }

  /**
   * 监听渲染进程发过来的消息
   */
  public static listen(): void {
    // 窗口最小化
    ipcMain.handle('minimizeWindow', (e) => {
      this.getWin(e)?.minimize();
    });

    // 窗口最大化
    ipcMain.handle('maxmizeWindow', (e) => {
      this.getWin(e)?.maximize();
    });

    // 退出窗口最小化
    ipcMain.handle('unmaximizeWindow', (e) => {
      this.getWin(e)?.unmaximize();
    });

    // 隐藏窗口
    ipcMain.handle('hideWindow', (e) => {
      this.getWin(e)?.hide();
    });

    // 显示窗口
    ipcMain.handle('showWindow', (e) => {
      this.getWin(e)?.show();
    });

    // 关闭窗口
    ipcMain.handle('closeWindow', (e) => {
      this.getWin(e)?.close();
    });

    // 返回 boolean - 用户是否可以手动调整窗口大小
    ipcMain.handle('resizable', (e) => {
      return this.getWin(e)?.isResizable();
    });

    // 通过传递不同的参数，可以获得不同的系统位置
    // 为一个 invokeable的IPC 添加一个handler。
    // 每当一个渲染进程调用 ipcRenderer.invoke(channel, ...args) 时这个处理器就会被调用。
    ipcMain.handle('getPath', (e, name: any) => {
      return app.getPath(name);
    });

    /**
     * 打开指定目录
     */
    ipcMain.handle('openDirectory', async (e, dir: string) => {
      if (dir) {
        await shell.openPath(dir);
      }
      return '';
    });

    /**
     * 获取窗口是否最大化
     */
    ipcMain.handle('getIsMaximized', (e) => {
      return this.getWin(e)?.isMaximized();
    });

    /**
     * 打开选择文件或文件夹对话框
     */
    ipcMain.handle('showOpenDialogSync', (e, { options, modal = true }: { options: OpenDialogSyncOptions; modal: boolean }): string[] | undefined => {
      if (modal) {
        return dialog.showOpenDialogSync(this.getWin(e) as BrowserWindow, options);
      }
      return dialog.showOpenDialogSync(options);
    });

    /**
     * 获取本地系统变量配置
     */
    ipcMain.handle('getLocalConf', async () => {
      const localConf = await getConfig();
      return localConf;
    });

    // ipcMain.on('')
  }

  public static regWinEvent(win: BrowserWindow): void {
    // 监听窗口最大化
    win.on('maximize', () => {
      win.webContents.send('windowMaximized');
    });
    // 监听窗口最小化
    win.on('unmaximize', () => {
      win.webContents.send('windowUnmaximized');
    });

    // 监听窗口卸载
    win.on('close', () => {
      win.webContents.send('windowClose');
    });

    // win.webContents.openDevTools({ mode: 'undocked' }); // 打开调试控制台
    win.webContents.setWindowOpenHandler((param) => {
      try {
        const config = JSON.parse(JSON.stringify({ ...windowConfig, show: true }));
        // 开发者自定义窗口配置对象
        const features = JSON.parse(param.features);
        Object.keys(features).forEach((p) => {
          if (p === 'webPreferences') {
            Object.keys(features.webPreferences).forEach((p2) => {
              config.webPreferences[p2] = features.webPreferences[p2];
            });
          } else {
            config[p] = features[p];
          }
        });
        if (config.modal === true) config.parent = win;
        // 允许打开窗口，并传递窗口配置对象
        const winConf: any = { action: 'allow', overrideBrowserWindowOptions: config };
        mainLogger.info('监听到本系统新窗口打开，窗口配置消息为 ===》', JSON.stringify(winConf));
        return winConf;
      } catch (e) {
        // 当解析数据出错说明打开的不是自己编写的脚本及页面
        const winConf: any = {
          action: 'allow',
          overrideBrowserWindowOptions: {
            autoHideMenuBar: true, // 关闭带单栏
            nodeIntegration: false // 不允许在渲染进程使用node
          }
        };
        mainLogger.warn('监听到第三方打开新窗口，窗口配置消息为 ===》', JSON.stringify(winConf));
        return winConf;
      }
    });
  }
}
