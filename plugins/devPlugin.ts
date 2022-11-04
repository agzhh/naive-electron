import {PluginOption, ViteDevServer} from "vite";
import {spawn} from 'child_process'

export const devPlugin = (): PluginOption => {
    return {
        name: 'dev-plugin',
        // 当 Vite 为我们启动 Http 服务的时候，configureServer钩子会被执行。
        configureServer(server: ViteDevServer) {
            /**
             * 编译平台 platform 设置为 node，排除的模块 external 设置为 electron，
             * 正是这两个设置使我们在主进程代码中可以通过 import 的方式导入 electron 内置的模块。
             * 非但如此，Node 的内置模块也可以通过 import 的方式引入。
             */
            require("esbuild").buildSync({
                entryPoints: ["./src/main/main.ts"], // 入口文件，通过对象方式可以指定输出后文件名，和 webpack 类似
                bundle: true, // 将所有源码打包到一起
                platform: 'node', // 定输出环境，默认为 browser 还有一个值是 node，
                outfile: "./dist/main.js", // 输出的文件名，，不能和 outdir 同时使用；单入口文件使用 outfile
                external: ["electron"] // 排除 electron 不进行打包，
            });
            // 通过监听 server.httpServer 的 listening 事件来判断 httpServer 是否已经成功启动
            server.httpServer?.once("listening", () => {
                const addressInfo = server.httpServer?.address() as {
                    address: string;
                    family: string;
                    port: number;
                }
                const httpAddress = `http://${addressInfo.address}:${addressInfo.port}`;
                /**
                 * 启动 Electron 应用，并给它传递两个命令行参数，第一个参数是主进程代码编译后的文件路径，第二个参数是 Vue 页面的 http 地址
                 * 为什么这里传递了两个命令行参数，而主进程的代码接收第三个参数（process.argv[2]）当作 http 页面的地址呢？
                 * 因为默认情况下 electron.exe 的文件路径将作为第一个参数。也就是我们通过 require("electron") 获得的字符串。
                 * 是通过 Node.js child_process 模块的 spawn 方法启动 electron 子进程的，除了两个命令行参数外，还传递了一个配置对象
                 */
                const electronProcess = spawn(require("electron").toString(), ['./dist/main.js', httpAddress], {
                    cwd: process.cwd(), // 设置当前的工作目录，process.cwd() 返回的值就是当前项目的根目录
                    //这里设置 inherit 可以让 electron 子进程的控制台输出数据同步到主进程的控制台。
                    // 这样我们在主进程中 console.log 的内容就可以在 VSCode 的控制台上看到了。
                    stdio: "inherit",
                })
                /**
                 * 当 electron 子进程退出的时候，我们要关闭 Vite 的 http 服务，并且控制父进程退出，准备下一次启动。
                 */
                electronProcess.on("close", () => {
                    server.close();
                    process.exit();
                });
            })
        }
    }
}
