import { protocol } from 'electron';
import path from 'path';
import fs from 'fs';

const schemeConfig = {
  standard: true,
  supportFetchAPI: true,
  bypassCSP: true,
  corsEnabled: true,
  stream: true
};

protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: schemeConfig }]);

// eslint-disable-next-line
export class CustomScheme {
  // 根据文件扩展名获取mime-type
  private static getMimeType(extension: string): string {
    let mimeType = '';
    if (extension === '.js') mimeType = 'text/javascript';
    else if (extension === '.html') mimeType = 'text/html';
    else if (extension === '.css') mimeType = 'text/css';
    else if (extension === '.svg') mimeType = 'image/svg+xml';
    else if (extension === '.json') mimeType = 'application/json';
    return mimeType;
  }

  // 注册自定义app协议
  static registerScheme(): void {
    protocol.registerStreamProtocol('app', (request, callback) => {
      // 获取到文件名称
      let pathName = new URL(request.url).pathname;
      console.log('pathName', pathName);
      // 获取到文件类型
      let extension = path.extname(pathName).toLowerCase();
      // if (pathName === "/") pathName = "index.html";
      if (extension === '') {
        pathName = 'index.html';
        extension = '.html';
      }
      const tarFile = path.join(__dirname, pathName);
      callback({
        statusCode: 200,
        headers: { 'content-type': this.getMimeType(extension) },
        data: fs.createReadStream(tarFile)
      });
    });
  }
}
