import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/mainView' },
  {
    path: '/mainView',
    component: () => import('@/renderer/views/mainView/index.vue'),
    meta: { title: '主页面' }
  },
  {
    path: '/home',
    component: () => import('@/renderer/views/home/index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/setting',
    component: () => import('@/renderer/views/setting/index.vue'),
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
