let _Vue = null

class Store {
  constructor(options) {
    const {
      state = {},
    }
    this.state = _Vue.observable(state)
    this.getters = Object.create(null)
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](state)
      })
    })
    this._mutations = mutations
    this._actions = actions
  }

}

function install (Vue) {
  _Vue = Vue
  _Vue.mixin({
    beforeCreate(){
      if (this.$options.store) {
        _Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {
  Store,
  install
}
