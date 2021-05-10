
let _Vue;
class VueRouter {
 constructor (options) {
   this.options = options 
   this.routeMap = {}
   this.mode = this.options.mode;
   this.data = _Vue.observable({
     current: '/'
   })
   history.replaceState({},'','/#/')
 }
 static install (Vue) {
   // 01 判断插件是否已经被安装了，如果已经安装过了我们就需要重复去安装
   if(VueRouter.install.installed) {
     return 
   }
   VueRouter.install.installed = true;
   // 02 把vue的构造函数记录到全局变量中，因为将来还要用到
   _Vue = Vue
   // 03 把创建vue实例时所穿传入的router对象，注入到所有的vue实例上
   _Vue.mixin({
     beforeCreate() {
       if (this.$options.router) {
         _Vue.prototype.$router = this.$options.router
         this.$options.router.init()
       }
     },
   })
 }
 init () {
   this.createRouteMap()
   this.initComponents(_Vue)
   this.initEvent()
 }
 createRouteMap () {
   this.options.routes.forEach(i => {
     this.routeMap[i.path]  = i.component
   })
 }
 initComponents (Vue) {
   const self = this
   Vue.component('router-link',{
     props:{to: String},
     render (h) {
       return h('a',{
         attrs: {
           href: this.to
         },
         on: {
           click: this.clickHandler
         }
       },[this.$slots.default])
     },
     methods: {
       clickHandler (e) {
         history.pushState({},'','#'+this.to)
         this.$router.data.current = this.to
         e.preventDefault();
       }
     },
     // template: '<a :href="to"><solt></solt></a>'
   })
   Vue.component('router-view',{
     render(h) {
       const component = self.routeMap[self.data.current]
       return h(component)
     }
   })
 }
 initEvent () {
   if(this.mode === 'history') {
     window.addEventListener('popstate', () => {
       this.data.current = window.location.pathname
     })
   }else if(this.mode === 'hash') {
     window.addEventListener('hashchange', () => {
       // console.log(window.location.hash.substr(1))
       this.data.current = window.location.hash.substr(1)
     })
   }

 }




}
export default VueRouter