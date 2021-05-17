/* @flow */

import { warn } from 'core/util/index'

export * from './attrs'
export * from './class'
export * from './element'

/**
 * Query an element selector if it's not an element already.
 */
export function query (el: string | Element): Element {
  // 判断el是否是字符串，如果不是默认是dom对象，如果是则是选择器
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected) {
      //
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      )
      return document.createElement('div')
    }
    return selected
  } else {
    // dom对象直接返回
    return el
  }
}
