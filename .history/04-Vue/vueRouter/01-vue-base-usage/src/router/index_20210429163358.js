import Vue from "vue"
import VueRouter from "vue-router"
// import Index from "../views/Index.vue"
import Layou from "../components/Layout.vue"

Vue.use(VueRouter)

const routes = [
    { 
        path: '/', 
        // name: 'Index',
        // component: Index,
        component: Layout,
    },
    { 
        path: '/about', 
        name: 'About',
        component: () => import('../views/About.vue')
    },
    { 
        path: '/detail/:id', 
        name: 'Detail',
        props: true,
        component: () => import('../views/Detail.vue')
    },
    { 
        path: '/footer', 
        name: 'Footer',
        component: () => import('../views/Footer.vue') 
    }
]

const router = new VueRouter({ routes})

export default router

