import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import optimizer from 'vite-plugin-optimizer';
import { aliasPlugin, devPlugin, getReplacer } from './plugins/devPlugin';
import { buildPlugin } from './plugins/buildPlugin';
import { assetsPlugin } from './plugins/assetsPlugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [optimizer(getReplacer()), devPlugin(), aliasPlugin(), vue(), assetsPlugin()],
  build: {
    rollupOptions: {
      // 配置多入口
      input: {
        about: path.join(__dirname, '/public/about.html')
      },
      plugins: [buildPlugin()]
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  }
});
