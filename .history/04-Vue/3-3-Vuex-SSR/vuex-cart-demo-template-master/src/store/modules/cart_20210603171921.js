const state = {
  cartProducts: []
}
const getters = {}
const mutations = {
  addToCart (state, product) {
    // 1.cartProducts中没有该商品，把该商品添加到数组，并增加count,ischecked,totalPrice
    // 2. cartProducts有该商品，让商品的数量加1，选中，计算小计
    const prod = state.cartProducts.find(item => item.id === product.id)
    if (prod) {
      prod.count ++
      prod.ischecked = true
    } else {
      state.cartProducts.push({
        ...product
      })
    }
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
