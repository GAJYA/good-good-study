export default class VueRouter {
    #### 实现思路


- 创建 LVueRouter 类
  - 初始化，options、routeMap、app(简化操作，创建 Vue 实例作为响应式数据记录当前路径)
  - initRouteMap() 遍历所有路由信息，把组件和路由的映射记录到 routeMap 对象中
  - 注册 popstate 事件，当路由地址发生变化，重新记录当前的路径
  - 创建 router-link 和 router-view 组件
  - 当路径改变的时候通过当前路径在 routerMap 对象中找到对应的组件，渲染 router-view
    let _Vue = {}
    static install (Vue) {

    }
}