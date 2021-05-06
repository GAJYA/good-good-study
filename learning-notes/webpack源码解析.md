1. 安装webpack4、webpack-cli3
2. 新建webpack.config.js
3. entry、output、devtool（是否开启source-map）、mode
4. 安装并使用插件HtmlWebpackPlugin
5. 新建index.js/index.html
6. 在index。js使用commonjs导出

分析built.js

1. 打包后的文件就是一个匿名函数的自调用
2. 传参为一个对象
3. 键名为入口文件路径
4. 值为函数，和node.js里的模块加载有些类似，会将被加载模块中的内容包裹于一个函数中
5. 这个对象为了方便简单称为模块的定义，它就是一个键值对
6. 这个函数将来会在某个时间点调用，同时会接收到一定的参数，利用这些参数就可以实现模块的加载操作
7. modules拿到模块定义后
8. 定义一个对象，存放已经被加载的对象，做一个缓存
9. __webpack_require__方法就算webpack自定义的，它的核心作用就是返回模块的exports





一、功能函数说明

1. index.js导入login.js 
2. login 导出信息module.exports = ‘sth’
3. log  导入的信息
4. index.html导入打包后的文件，运行html观察结果
5. 查看build.js文件
6. `__webpack_require__`方法替换掉了require方法



1. 定义对象用于缓存已加载过的模块
2. `__webpack_require__`方法替换掉了require方法，webpack自定义的一个加载方法，核心功能就是返回被加载模块中导出的内容
3. `m`方法将模块定义保存一份，通过m属性挂载到自定义的方法上
4. `d`方法如果当前exports不具备name属性，则条件成立，给exports添加name属性，设置为可枚举类型，给该属性添加一个访问器，getter
5. `o`方法判断被传入的对象obj身上是否具有某个指定的属性，有则返回true
6. `r`判断是否是esmodule，如果是，向exports对象身上添加个属性,j键名为symbol.toStringTag（Object.prototype.toString.call(exports),值为‘Module'。如果不是，在exports对象身上添加一个__esmodule属性，值为true
7. `t`，调用t方法后，会先加载被导入的模块的内容 value；对于value来说我们可能会直接返回，也可能处理后再返回
8. `n`，接受一个module，定义一个getter，返回这个getter
9. `p`，config中定义的publicpath
10. `s`，当前主入口

方法的使用大量存在于esModule调用esModule，esModule调用commonjs,commonjs调用esModule,commonjs调用commonjs之间





webpack的loader、plugins是做什么的？

loader是转换非js文件的，webpack自身只理解js，通过loader将不同类型的文件转换为javascript便于webpack进行打包

插件可以做一些更有趣的事情，打包优化，代码压缩，重新定义环境中的变量等等，可以处理各种各样的任务。webpack自身内置的有部分插件，例如[`DefinePlugin`](https://www.webpackjs.com/plugins/define-plugin)，此外还有很多第三方插件，可以通过npm.yarn安装后使用

webpack的内置优化，可以通过设置mode参数进行，不同模式下的优化内容不一样。

```javascript
module.exports = {
	mode: 'none', //可选值，development、production 
}
```

webpack的配置为什么会起作用？？？

**r做了什么呢？**

给这个模块做标记，标记是esm模块

__esModule用来标记是esm模块规范，只要是es6

**为什么export 导出的文件，会执行r方法，这个是怎么判断什么时候执行r方法的？**

index作为入口会执行webpack_require方法

文件导出使用了esm就会执行r方法、d方法

直接commonjs方式导出的，啥都不会做，直接导出

**index使用esm导入文件会干什么呢？**

只有遇到esm模块，就会执行r方法进行标记

不管是使用import还是require，在webpack里都会替换成__webpack_require__

**n方法做了什么？**

n方法之前会执行r方法对模块对象进行标记，是否是esm，如果不是的话，返回一个getter方法，直接return，如果是esm的话，返回一个getter方法，return 出default的值

**使用esm导出时候，为什么执行d方法后设置了get方法，然后到下面const [属性名] = xxx就可以赋值？？？？**

**` __webpack_require__`方法做了什么？**

1. 用来替换import 和 require的加载操作

   1. 判断缓存中是否存在被加载的模块内容，如果存在直接返回exporgts

   2. 如果缓存里没有，自己定义一个对象，把加载的模块内容存起来

      ```js
      let module = installedModules[moduleId] = {
          i: moduleId, //标识符
          l: false, // loaded 是否加载
          exports: {} // 存的导出的数据
      }
      ```

   3. 调用当前moduleId对应的函数，完成内容的加载

      ```js
      modules[moduleId].call(module.exports,module,module.exports, __webpack_require__)
      ```

   4. 上述方法调用完成后，可以修改l的值为true表示当前模块内容已经加载完成

   5. 加载工作完成后，要将拿到的内容return出去供外部使用

2. call方法做了什么？？？



1. import（）可以实现指定模块的懒加载操作

**jsonp是什么？怎么就生成了script？？？**

2. **e方法做了什么？**

e方法执行一系列方法后（核心原理是jsonp），最终返回一个promise

**3. t方法做了什么？**

t方法可以针对内容进行不同的处理（处理方式根据传入的数值，可选值1、2、3、7、6、8）



webpack代码打包入口文件

1. cmd文件核心的作用就是找到node环境，还有webpack-cli
2. webpack.js中核心的操作就是require了nodemodules下的webpack-cli下bin文件下的cli.js
3. cli.js
   1. 当前文件一般有两个操作，处理参数，将参数交给不同的逻辑（分发业务）
   2. options
   3. complier
   4. complier.run(至于run里面做了什么，后续再看，当前只关注打包入口点)

webpack编译流程

1. 定位webpack打包入口
2. 新建run.js
   1. 导入webpack
   2. 导入webpack.config.js配置文件
   3. 定义变量compiler，值为webpack方法入参为配置信息
   4. compiler执行run方法，回调函数打印出error和stats
3. 

1. 



