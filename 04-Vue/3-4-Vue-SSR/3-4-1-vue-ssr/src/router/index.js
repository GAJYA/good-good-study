import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history', // 兼容前后端
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/about',
        component: () => import('@/components/About.vue') // 动态加载，代码分割
      }, 
      {
        path: '/posts',
        component: () => import('@/components/Posts.vue') // 动态加载，代码分割
      }, 
      {
        path: '*',
        component: () => import('@/components/404.vue')
      }
    ]
  })
}
