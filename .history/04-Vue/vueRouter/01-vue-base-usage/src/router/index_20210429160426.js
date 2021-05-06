import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
    { path: '/about', component: About },
    { path: '/footer', component: Bar }
]

