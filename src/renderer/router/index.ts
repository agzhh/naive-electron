import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {App} from "vue";

const routes: RouteRecordRaw[] = [
    {path: '/', redirect: '/home'},
    {
        path: '/home',
        component: () => import('@/renderer/views/home/index.vue'),
        meta: {title: '首页'}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default function setupRouter(app: App) {
    app.use(router)
}
