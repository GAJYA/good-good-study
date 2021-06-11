const state = {
  cartProducts: []
}
const getters = {
  totalPrice (state) {
    return state.cartProducts.reduce((sum, prod) => sum + prod.totalPrice, 0)
  },
  totalCount (state) {
    return state.cartProducts.reduce((sum, prod) => sum + prod.count, 0)
  },
  checkedPrice (state) {
    return state.cartProducts.reduce((sum, prod) => sum + prod.totalPrice, 0)
  },
  checkedCount (state) {
    return state.cartProducts.reduce((sum, prod) => sum + prod.count, 0)
  },
}
const mutations = {
  addToCart (state, product) {
    // 1.cartProducts中没有该商品，把该商品添加到数组，并增加count,isChecked,totalPrice
    // 2. cartProducts有该商品，让商品的数量加1，选中，计算小计
    const prod = state.cartProducts.find(item => item.id === product.id)
    if (prod) {
      prod.count++
      prod.totalPrice = prod.count * prod.price
    } else {
      state.cartProducts.push({
        ...product,
        count: 1,
        isChecked: true,
        totalPrice: product.price
      })
    }
  },
  deleteFromCart (state, prodId) {
    const index = state.cartProducts.findIndex(item => item.id === prodId)
    index !== -1 && state.cartProducts.splice(index, 1)
  },
  updateAllProductChecked (state, checked) {
    state.cartProducts.forEach(item => { item.isChecked = checked })
  },
  updateProductChecked (state, {
    checked,
    prodId
  }) {
    const prod = state.cartProducts.find(item => item.id === prodId)
    prod && (prod.isChecked = checked)
  },
  updateProduct (state, {
    prodId,
    count
  }) {
    const prod = state.cartProducts.find(item => item.id === prodId)
    if (prod) {
      prod.count = count
      prod.totalPrice = prod.price * count
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
