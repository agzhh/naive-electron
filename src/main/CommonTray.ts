import { BrowserWindow, Menu, Tray, app } from 'electron';
import path from 'path';

export class CommonTray {
  public static regWinTray(win: BrowserWindow): void {
    const tray = new Tray(path.join(__dirname, 'mainAssets/naive.ico'));
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '  应用退出  ',
        click: () => {
          win.destroy();
          app.quit();
          app.exit(0);
        }
      },
      {
        label: '  关于naive-electron  ',
        click: () => {
          win.webContents.send('openAbout');
        }
      }
    ]);
    // tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);
    tray.on('click', () => {
      win.show();
    });
  }
}
