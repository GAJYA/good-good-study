/*
 *                   江城子 . 程序员之歌
 * 
 *               十年生死两茫茫，写程序，到天亮。
 *                   千行代码，Bug何处藏。
 *               纵使上线又怎样，朝令改，夕断肠。
 * 
 *               领导每天新想法，天天改，日日忙。
 *                   相顾无言，惟有泪千行。
 *               每晚灯火阑珊处，夜难寐，加班狂。
 * 
 * 
 * @Description: 
 * @Author: lunarJan
 * @Date: 2021-05-11 16:16:55
 * @LastEditors: lunarJan
 * @LastEditTime: 2021-05-12 11:42:56
 */


// init 注册模块
// h   设置
// patch 

import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'

// 导入模块
import { styleModule } from 'snabbdom/build/package/modules/style'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'
// 注册模块
const patch = init([styleModule, eventListenersModule])

// 使用h()函数的第二个参数传入模块中使用的数据（对象）
let vnode = h('div', [
    h('h1', {style:{ backgroundColor:'pink' }},[
        h('span', 'Hello World')
    ]),
    h('p', {on: {click: eventHandler}}, 'click me')
])
function eventHandler () {
    console.log('click handler');
}
let app = document.querySelector('#app')

patch(app, vnode)
