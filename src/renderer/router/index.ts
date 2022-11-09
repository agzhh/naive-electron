import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/mainView' },
  {
    path: '/mainView',
    redirect: '/mainView/frame',
    component: () => import('@/renderer/views/mainView/index.vue'),
    meta: { title: '主页面' },
    children: [
      {
        path: 'frame',
        meta: { title: '框架' },
        redirect: '/mainView/frame/file',
        component: () => import('@/renderer/views/mainView/frame/index.vue'),
        children: [
          {
            path: 'file',
            meta: { title: '文件' },
            component: () => import('@/renderer/views/mainView/frame/file/index.vue')
          },
          {
            path: 'view',
            meta: { title: '视图' },
            component: () => import('@/renderer/views/mainView/frame/view/index.vue')
          }
        ]
      },
      { path: 'other', meta: { title: '其他' }, component: () => import('@/renderer/views/mainView/other/index.vue') }
    ]
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
