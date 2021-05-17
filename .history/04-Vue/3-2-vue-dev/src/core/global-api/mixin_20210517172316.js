/* @flow */

import { mergeOptions } from '../util/index'

export function initMixin (Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    // 把传来的选项copy到this.options即，vue
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
