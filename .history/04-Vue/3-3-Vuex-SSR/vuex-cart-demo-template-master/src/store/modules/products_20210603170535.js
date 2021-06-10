import axios from 'axios'
const state = {
  products: []
}
const getters = {}
const mutations = {
  setProducts (state, payload) {
    state.products = payload
  }
}
const actions = {
  async getProducts ({ commit }) {
    const { data } = await axios({
      method: ''
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
