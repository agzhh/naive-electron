import { BrowserWindow, Menu, Tray } from 'electron';
import path from 'path';

export class CommonTray {
  public static regWinTray(win: BrowserWindow): void {
    const tray = new Tray(path.join(__dirname, 'mainAssets/naive.ico'));
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '  应用退出  ',
        role: 'quit',
        click: () => {
          win?.close();
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
