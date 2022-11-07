import fs from 'fs';
import path from 'path';
import esbuild from 'esbuild';
import { Plugin } from 'rollup';

class BuildObj {
  /**
   * 编译主进程代码
   * 由于 Vite 在编译之前会清空 dist 目录，所以我们在上一节中生成的 mainEntry.js 文件也被删除了，
   * 此处我们通过buildMain方法再次编译主进程的代码。
   * 不过由于此处是在为生产环境编译代码，所以我们增加了minify: true 配置，生成压缩后的代码。
   * 如果你希望与开发环境复用编译主进程的代码，也可以把这部分代码抽象成一个独立的方法。
   * */
  static buildMain() {
    esbuild.buildSync({
      entryPoints: ['./src/main/main.ts'], // 入口
      bundle: true, // 打包
      platform: 'node', // (browser | node | neutral, default browser) #  编译的环境 （browser | node | neutral, 默认浏览器）
      minify: true, // 代码压缩（设置所有使用 --minify-*）
      outfile: './dist/main.js', // 文件输出名称（对于单个入口点）
      external: ['electron'] // 从模块中排除M（可以使用*作为通配符）
    });
  }

  /**
   * 为生产环境准备package.json
   * 用户安装我们的产品后，在启动我们的应用程序时，实际上是通过 Electron 启动一个 Node.js 的项目，
   * 所以我们要为这个项目准备一个 package.json 文件，
   * 这个文件是以当前项目的 package.json 文件为蓝本制作而成的。
   * 里面注明了主进程的入口文件，移除了一些对最终用户没用的配置节
   *
   * 生成完 package.json 文件之后，还创建了一个 node_modules 目录。此举是为了阻止 electron-builder 的一些默认行为
   * （这一点我们后续章节还会介绍，目前来说它会阻止electron-builder为我们创建一些没用的目录或文件）。
   *
   * 这段脚本还明确指定了 Electron 的版本号，如果 Electron 的版本号前面有"^"符号的话，需把它删掉。
   * 这是 electron-builder 的一个 Bug，这个 bug 导致 electron-builder 无法识别带 ^ 或 ~ 符号的版本号。
   */
  static preparePackageJson() {
    // 获取本地 package.json
    const pkgJsonPath = path.join(process.cwd(), 'package.json');
    // 获取本地 package.json 内容
    const localPkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
    // 获取到本地 electron 版本
    const electronConfig = localPkgJson.devDependencies.electron.replace('^', '');
    // 设置项目入口
    localPkgJson.main = 'main.js';
    // 删除 package.json 中 scripts devDependencies
    delete localPkgJson.scripts;
    delete localPkgJson.devDependencies;
    // 设置 electron 版本
    localPkgJson.devDependencies = { electron: electronConfig };
    // 创建打包 package.json 路径
    const tarJsonPath = path.join(process.cwd(), 'dist', 'package.json');
    // 写入 打包 package.json
    fs.writeFileSync(tarJsonPath, JSON.stringify(localPkgJson));
    // 创建 打包 node_modules
    fs.mkdirSync(path.join(process.cwd(), 'dist/node_modules'));
  }

  /**
   * 使用electron-builder制成安装包
   *
   * buildInstaller。这个方法负责调用electron-builder提供的 API 以生成安装包。
   * 最终生成的安装包被放置在release目录下，这是通过config.directories.output指定的。
   * 静态文件所在目录是通过config.directories.app配置项指定。
   *
   * [官方文档](https://www.electron.build/)
   */
  static async buildInstaller(): Promise<string[]> {
    const options = {
      config: {
        directories: {
          output: path.join(process.cwd(), 'release'),
          app: path.join(process.cwd(), 'dist')
        },
        files: ['**'],
        extends: null,
        productName: 'naive-desktop', // 应用安装完之后的名称
        appId: 'com.naive.desktop', // 应用的唯一id，，确认后不要改动了！不然在更新时候，会被认做为两个应用。这个是在apple那里你申请证书的时候，用生成的那个id就可以，类似这种'com.example.app'。
        asar: true, // 是否使用Electron的存档格式将应用程序的源代码打包到存档中
        copyright: 'Copyright © 2022 https://github.com/agzhh/naive-electron',
        win: {
          icon: 'public/naive.ico', // 程序图标
          target: [
            'nsis', // 打包为nsis安装文件
            'zip' // 打包为安装文件zip
          ]
        },
        // window安装程序配置
        nsis: {
          oneClick: false, // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
          perMachine: true, //  // 是否开启安装时权限限制（此电脑或当前用户）
          allowToChangeInstallationDirectory: true, // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
          deleteAppDataOnUninstall: true, // 卸载时删除用户数据
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: 'naiveDesktop', // 快捷方式名称
          installerIcon: 'public/naive.ico', // 安装图标
          uninstallerIcon: 'public/naive.ico', // 卸载图标
          installerHeaderIcon: 'public/naive.ico' // 安装时头部图标
        },
        extraResources: {
          from: path.join(process.cwd(), 'resources/'),
          to: './'
        },
        publish: [{ provider: 'generic', url: 'http://localhost:5500/' }]
      },
      project: process.cwd()
    };
    // eslint-disable-next-line global-require
    return require('electron-builder').build(options);
  }
}

export const buildPlugin = (): Plugin => {
  return {
    name: 'build-plugin',
    closeBundle: () => {
      const buildObj = new BuildObj();
      buildObj.buildMain();
      buildObj.preparePackageJson();
      buildObj.buildInstaller();
    }
  };
};
