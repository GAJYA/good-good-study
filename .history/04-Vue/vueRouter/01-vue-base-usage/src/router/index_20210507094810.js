import Vue from "vue"
import VueRouter from "../vue-router/Vue-Router.js"
// import VueRouter from "../vue-router/index.js"
// import Index from "../views/Index.vue"
import Layout from "../components/Layout.vue"

Vue.use(VueRouter)

const routes = [
    { 
        path: '/', 
        // name: 'Index',
        // component: Index,
        component: Layout,
        // children: [
        //     { 
        //         path: '', 
        //         name: 'Index',
        //         component: () => import('../views/Index.vue')
        //     },
        //     { 
        //         path: '/detail/:id', 
        //         name: 'Detail',
        //         props: true,
        //         component: () => import('../views/Detail.vue')
        //     },
        // ]
    },
    { 
        path: '/about', 
        name: 'About',
        component: () => import('../views/About.vue')
    },
    // { 
    //     path: '/detail/:id', 
    //     name: 'Detail',
    //     props: true,
    //     component: () => import('../views/Detail.vue')
    // },
    { 
        path: '/footer', 
        name: 'Footer',
        component: () => import('../views/Footer.vue') 
    }
]

const router = new VueRouter({
    mode: 'history', // history模式 
    routes
})

export default router

