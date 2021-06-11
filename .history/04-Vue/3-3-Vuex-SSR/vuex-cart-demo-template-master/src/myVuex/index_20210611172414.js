let _Vue = null

class Store {}

function install (Vue) {
  _Vue = Vue
  _Vue.mixin({
    beforeCreate(){
      
    }
  })
}

export default {
  Store,
  install
}
