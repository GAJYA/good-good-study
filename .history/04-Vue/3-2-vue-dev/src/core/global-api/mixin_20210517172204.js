/* @flow */

import { mergeOptions } from '../util/index'

export function initMixin (Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    // 把传来的选项
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
