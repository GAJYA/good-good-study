import axios f
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

  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
