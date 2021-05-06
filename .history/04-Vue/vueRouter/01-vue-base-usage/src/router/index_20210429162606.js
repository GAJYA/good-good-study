import Vue from "vue"
import VueRouter from "vue-router"
import Index from "../views/Index.vue"

Vue.use(VueRouter)

const routes = [
    { 
        path: '/', 
        name: 'Index',
        component: Index
    },
    { 
        path: '/about', 
        name: 'About',
        component: () => import('../views/About.vue')
    },
    { 
        path: '/detail/:id', 
        name: 'About',
        component: () => import('../views/About.vue')
    },
    { 
        path: '/footer', 
        name: 'Footer',
        component: () => import('../views/Footer.vue') 
    }
]

const router = new VueRouter({ routes})

export default router

