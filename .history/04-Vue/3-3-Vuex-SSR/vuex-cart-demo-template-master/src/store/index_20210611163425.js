import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'

const myPlugin = store => {
  store.subscribe(mutation, state) => {
    // 每次mutation之后调用
    // mutation的格式为{ type, payload }
    if(mu)
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart,
    products
  }
})
