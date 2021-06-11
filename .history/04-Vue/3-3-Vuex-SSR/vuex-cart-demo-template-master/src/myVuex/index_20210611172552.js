let _Vue = null

class Store {}

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
