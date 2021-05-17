/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend, // 浅拷贝
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  // 初始化Vue.config属性
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // 这些工具方法不视为全局api的一部分，存在某些风险，不建议去直接使用他们，除非你明确知道这些风险
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  // 静态方法
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  // 把对象 转换成响应式的
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }

 // 初始化vue.options对象，并给其扩展
//  components/directives/filters
// /</T>
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  // 设置keep-alive组件
  extend(Vue.options.components, builtInComponents)

  // 注册Vue.use(用来注册插件)
  initUse(Vue)
  // 注册Vue.use(用来注册插件)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}
