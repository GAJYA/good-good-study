import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const createStore = () => {
    return new Vuex.Store({
        state: () => {
            posts: [] // 文章列表
        },
        mutations: {
            setPosts (state, data) {
                state.posts = data
            }
        },
        actions: {
            // 在服务端渲染期间必须让action返回一个promise,因为服务渲染期间调用action一定要等着promise完成以后再去执行真正的渲染字符串的工作
            async getPosts ({commit}) {
                const {data} = await axios.get('https://cnodejs.org/api/v1/topics')
                commit('setPosts', data.data)
            }
        }
    })
}