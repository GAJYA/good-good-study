import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
    { path: '/about', component: About = () => import },
    { path: '/footer', component: Bar }
]

