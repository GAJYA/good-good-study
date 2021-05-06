import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
    { 
        path: '/about', 
        component: () => import('../views/About.vue')
    },
    { 
        path: '/footer', 
        component: () => import('../views/About.vue') }
]

