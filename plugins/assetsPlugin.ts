import { PluginOption } from 'vite';
import fs from 'fs';
import path from 'path';

export const assetsPlugin = (): PluginOption => {
  return {
    name: 'assets-plugin',
    closeBundle() {
      const srcPath = path.join(process.cwd(), 'src/main/mainAssets');
      const tarPath = path.join(process.cwd(), 'dist/mainAssets');
      fs.cpSync(srcPath, tarPath, { recursive: true });
    },
    configureServer() {
      const srcPath = path.join(process.cwd(), 'src/main/mainAssets');
      const tarPath = path.join(process.cwd(), 'dist/mainAssets');
      fs.cpSync(srcPath, tarPath, { recursive: true });
    }
  };
};
