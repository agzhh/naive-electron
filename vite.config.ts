import glob from 'glob';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import optimizer from 'vite-plugin-optimizer';
import { aliasPlugin, devPlugin, getReplacer } from './plugins/devPlugin';
import { buildPlugin } from './plugins/buildPlugin';
import { assetsPlugin } from './plugins/assetsPlugin';

const getInput = () => {
  const pageEntry = {};
  const allEntry = glob.sync('./*.html');
  allEntry.forEach((entry: string) => {
    const pathArr = entry.split('/');
    const name = pathArr[pathArr.length - 1].split('.')[0];
    pageEntry[name] = resolve(__dirname, `${name}.html`);
  });
  return pageEntry;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [optimizer(getReplacer()), devPlugin(), aliasPlugin(), vue(), assetsPlugin()],
  build: {
    rollupOptions: {
      // 配置多入口
      input: getInput(),
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/name-[hash].[ext]'
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
