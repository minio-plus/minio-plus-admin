/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description router全局配置，如有必要可分文件抽离
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)

export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true,
    },
    {
        path: '/register',
        component: () =>
            import ('@/views/register/index'),
        hidden: true,
    },
    {
        path: '/401',
        name: '401',
        component: () =>
            import ('@/views/401'),
        hidden: true,
    },
    {
        path: '/404',
        name: '404',
        component: () =>
            import ('@/views/404'),
        hidden: true,
    },
]

/*当settings.js里authentication配置的是intelligence时，views引入交给前端配置*/
export const asyncRoutes = [{
        path: '/',
        component: Layout,
        redirect: '/index',
        children: [{
            path: '/index',
            name: 'Index',
            component: () =>
                import ('@/views/index/index'),
            meta: {
                title: '首页',
                icon: 'home',
                affix: true,
                noKeepAlive: true,
            },
        }],
    },

    {
        path: '/bucket',
        component: Layout,
        redirect: '/index',
        meta: {
            title: '桶管理',
            icon: 'coins'
        },
        children: [
            {
                path: 'index',
                name: 'Bucket',
                component: () =>
                    import ('@/views/bucket/index'),
                meta: {
                    title: '桶管理',
                    icon: 'coins',
                },
            }
        ]
    },

    {
        path: '/bucket/lifecycle',
        component: Layout,
        redirect: '/index',
        children: [
            {
                path: 'rule',
                name: 'BucketLifecycleRule',
                component: () =>
                    import ('@/views/lifecycle/index'),
                meta: {
                    title: '生命周期管理',
                    icon: 'object-group'
                },
            }
        ]
    },

    {
        path: '/object',
        component: Layout,
        redirect: '/index',
        children: [
            {
                path: 'index',
                name: 'Object',
                component: () =>
                    import ('@/views/object/index'),
                meta: {
                    title: '对象管理',
                    icon: 'object-group'
                },
            }
        ]
    },

    {
        path: '*',
        redirect: '/404',
        hidden: true,
    },
]

const router = new VueRouter({
        base: routerMode === 'history' ? publicPath : '',
        mode: routerMode,
        scrollBehavior: () => ({
            y: 0,
        }),
        routes: constantRoutes,
    })
    //注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
    /* const originalPush = VueRouter.prototype.push;
    VueRouter.prototype.push = function push(location, onResolve, onReject) {
      if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject);
      return originalPush.call(this, location).catch((err) => err);
    }; */

export function resetRouter() {
    router.matcher = new VueRouter({
        base: routerMode === 'history' ? publicPath : '',
        mode: routerMode,
        scrollBehavior: () => ({
            y: 0,
        }),
        routes: constantRoutes,
    }).matcher
}

export default router