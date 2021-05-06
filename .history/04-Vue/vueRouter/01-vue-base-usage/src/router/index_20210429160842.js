import Vue from "vue"
import VueRouter from "vue-router"
import Index from "index"

Vue.use(VueRouter)

const routes = [
    { 
        path: '/', 
        component: Index
    },
    { 
        path: '/about', 
        component: () => import('../views/About.vue')
    },
    { 
        path: '/footer', 
        component: () => import('../views/Footer.vue') }
]

