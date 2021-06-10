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
  async getProducts
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
