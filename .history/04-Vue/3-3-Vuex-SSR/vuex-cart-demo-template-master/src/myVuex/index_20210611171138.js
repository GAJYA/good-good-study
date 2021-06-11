let _Vue = null

class Store {}

function install (Vue) {
  _Vue = Vue
}

export default {
  Store,
  install
}
