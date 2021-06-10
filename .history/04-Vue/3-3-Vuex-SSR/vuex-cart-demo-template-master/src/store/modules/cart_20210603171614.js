const state = {

}
const getters = {}
const mutations = {
  addToCart (state, product) {
    // 1.cartProducts中没有该商品，把该商品添加到数组，并增加count,ischecked,totalPrice
    // 2. cartProducts有该商品，让商品的数量加1
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
