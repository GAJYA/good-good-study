/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // this指向vue的构造函数
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // 注册插件

    // additional parameters
    // 把args转换为数组，并把数组中的第一个元素（plugin）去除
    const args = toArray(arguments, 1)
    // 把this（Vue)插入第一个元素的位置
    args.unshift(this)
    // 插件必须有install方法
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    
    installedPlugins.push(plugin)
    return this
  }
}
