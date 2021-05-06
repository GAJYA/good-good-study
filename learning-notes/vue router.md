## vue router

一、vue router是什么？做了个什么事情？解决了什么问题？

route是什么？

web开发中的路由是指根据url分配到对应的处理程序，根据url找到能处理这个URL的程序或模块。传统web开发是每个请求地址都会请求服务器进行处理，但是用户有些操作无需请求服务器，直接页面端修改下逻辑就能达到目的，这种建议使用路由。以前是使用js直接处理，但是使用js不会更新url，不方便用户收藏，使用路由可以解决这个问题，对搜索引擎对用户都比较友好。



使用步骤：

```js
// index.js

```

1. 导入vue和vuerouter
2. 注册插件，使用Vue.use (vuerouter)
3. 创建路由对象，配置路由规则
4. 注册router对象，创建vue实例时候传入router
5. 设置routerview创建路由占位
6. 通过router-link设置链接

**当实例化vue的时候，传入router会发生什么？**

控制台打印后会发现实例上会被添加$route和$router的属性

动态路由如何实现？？？

**动态路由的两种方式(例子:  path: '/detail/:id'   )**

* 在组件中使用$route.param.id

* 动态路由开启props，可以在组件中接收到设置的id

**嵌套路由**

**编程式导航**

* 使用this.$router.replace()，跳转不记录历史
* this.$route.push(),跳转记录历史
* this.$route.go()跳转到某个历史页面
* this.$route.back()后退

**hash和history模式区别**

* 表现形式
  * hash带#和?
  * history没有
* 原理区别
  * hash模式是基于锚点，以及onhashchange事件
  * history模式是基于HTML·5中的history API
    * history.push方法会向服务器发送请求，history.pushState不会，会直接改变浏览器地址栏中的地址，并把地址保存在历史记录中，IE10以后才支持
    * history.replaceState( )

**history模式的使用**

* history需要服务器的支持
* 单页应用中，服务端不存在除了index外的地址，会返回默认的找不到该页面
* 在服务端应该除了静态资源外都返回单页应用的index.html



**node.js的history模式**

* 新建app.js文件
* 安装、加载express，conentblabla反正是一个专门的history处理插件
* use(history)插件
* 监听3000端口和放打包好的文件的路径
* node app.js

**history模式下，刷新页面会发生什么？**

浏览器会去向服务器发送请求，服务器没有找到这个地址的文件，会返回index页面，index页面加载出对应的路由组件

**nginx配置history模式**

```config
localhost {
	root
	index.html index.htm
	try_files: $uri $uri/ /index.html
}
```

**vuerouter分析**

* 是一个含有install静态方法的类
* 函数

二、为什么要有vue router而不是直接使用原生的跳转等？



三、vue router是怎么实现的？

当路径切换的时候，在浏览器端判断当前路径并加载当前路径对应的组件

**vueRouter的实现原理**

* hash模式实现
  * 把url中#后面的内容作为路径地址，如果url中只改变#后的内容，浏览器不会向服务器请求这个地址，但是会添加到浏览器的历史记录中
  * hash改变后，会触发hashchange事件，监听hashchange事件并做相应的处理
  * 在hashchange事件中根据当前路由地址找到对应组件并进行渲染
* history模式
  * history模式地址栏就是普通的url，利用history.pushState()方法不会直接向服务器发送请求，并且会存到客户端历史记录中
  * 监听popState事件，可以监听到浏览器历史操作的变化，在popState的处理函数中可以记录改变后的地址，调用pushState或replaceState不会触发该事件，点击浏览器的前进或者后退按钮或者调用back，forward等和历史相关会触发
  * 根据当前路由地址找到对应的组件重新渲染

