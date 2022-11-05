import { createApp } from 'vue';
import App from '@/renderer/App.vue';
import setupRouter from '@/renderer/router';
import setupStore from '@/renderer/store';
import { setupNaive } from '@/renderer/plugins/naive';
import '@/renderer/assets/style/main.css';

async function bootstrap(): Promise<void> {
  const app = createApp(App);
  // 注册全局常用的 naive-ui 组件
  setupNaive(app);
  // 挂载状态管理 pinia
  setupStore(app);
  // 挂载路由
  await setupRouter(app);
  app.mount('#app', true);
}

void bootstrap();
