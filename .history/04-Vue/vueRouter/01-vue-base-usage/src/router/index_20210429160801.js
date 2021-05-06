import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
    { 
        path: '/', 
        component: () => import('../views/About.vue')
    },
    { 
        path: '/about', 
        component: () => import('../views/About.vue')
    },
    { 
        path: '/footer', 
        component: () => import('../views/Footer.vue') }
]

