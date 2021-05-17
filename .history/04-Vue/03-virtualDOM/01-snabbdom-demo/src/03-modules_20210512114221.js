/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑       永不宕机     永无BUG
 * 
 * @Description: 
 * @Author: lunarJan
 * @Date: 2021-05-11 16:16:55
 * @LastEditors: lunarJan
 * @LastEditTime: 2021-05-12 11:42:21
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
