import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: async () => await import('@/renderer/views/home/index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/setting',
    component: async () => await import('@/renderer/views/setting/index.vue'),
    meta: { title: '设置' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default function setupRouter(app: App): void {
  app.use(router);
}
