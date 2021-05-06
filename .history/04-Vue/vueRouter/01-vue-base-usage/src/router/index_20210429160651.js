import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
    { path: '/about', component: () => import('../views/A')},
    { path: '/footer', component: Bar }
]

