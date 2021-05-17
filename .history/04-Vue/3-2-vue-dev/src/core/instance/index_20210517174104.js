import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 此处不使用class的原因是因为方便后续给Vue实例混入实例成员
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 调用init方法
  this._init(options)
}

// 设置vue实例的成员
// 注册vm的init方法，初始化vm
initMixin(Vue)
// 注册vm的$data/$props/$set/$delete/$watch
stateMixin(Vue)
// 初始化事件相关的混入方法
// $on /$
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
