## 为什么会有webpack打包工具出现

为什么会有webpack打包工具出现？？？

1. 打包是做什么呢？就是把代码打包成一个或多个模块，最后把被打包的模块插入到对应的HTML模板中，供浏览器使用
2. webpack基于前面的经验教训，支持了各种方式表达的模块依赖关系
   * commonjs的require语句
   * AMD/CMD的define和require语句
   * es6的 export import语句
   * css/sass/less 文件中的@import 语句

在webpack出现之前，代码是如何做的？？？

模块化的出现的原因是什么？？？

1. 原始时代，js作为一个脚本语言，只做简单的表单校验，动画效果，代码量少，维护简单

2. ajax异步请求出现后，能做的事情越来越多，代码量越来越大，开始遇到问题

   * 全局变量的问题，不同的人开发时可能重复定义了变量导致覆盖，从而出现bug（真棒，nice）
   * 依赖关系管理，如果不同js文件之间存在依赖关系，比如a依赖b，b依赖c，这样的话引入js文件就必须要保证顺序，非常非常不方便！！！！

3. so,上述问题最初解决方案是什么呢？

   * 使用闭包解决全局变量问题，但是当模块越来越多时候，问题依然存在，说白了就全靠约定，避免问题出现

     ```javascript
     moduleA = function () {
         var a, b
         return {
             add: function (c) {
                 return a + b + c
             }
         }
     }()
     ```

     

   * 使用命名空间？？？？？？？？？

     最终想要的效果是什么呢？

     * 包装一个模块的代码，避免出现全局变量污染的情况
     * 模块本身是唯一的

4. nodejs这一大杀器出现了，开创了可以使用js写服务端代码的新纪元，`对于服务端而言必然需要模块化`？？？？？

5. 由于nodejs的这一需求，出现了commonJs，所以commonjs是针对服务端的，对前端而言即通常运行在node环境中

6. **commonjs做了什么实现了服务端模块规范呢**？？？

   1. 定义模块，使用module.exports属性
   2. 导入模块，使用require()函数
   3. 模块标识，即require的入参

   一个文件代表了一个模块，一个模块除了自己的函数作用域外，最外层包裹了一个 模块作用域，module就是代表这个模块

   主要是干了件什么事呢？把方法和变量限定在了私有作用域内，同时支持导入导出，每个模块有独立的空间，互不干扰

7. 那么服务端模块化是怎么回事儿呢？（commonjs是同步执行的）

   * 服务端加载一个模块，直接就从硬盘或者内存中读取了，消耗时间可以忽略不计

8. 前端模块化是指什么？

   * 如果是浏览器（前端）也用这一套来加载模块，首先需要先从服务端下载这个文件，等代码模块下载完，并运行之后蔡能得到所需要的API
   * 那么问题来了，假如某个代码模块里require了一个模块，这个模块需要通过http请求获取，网速较慢的情况，commonjs又是同步的，将会阻塞后续代码的执行，完了阻塞浏览器的渲染页面，哦豁，你就能看到页面假死状态。
   * so，出现了require.js解决阻塞的问题，随即AMD（**Asynchronous Module Definition**）规范也被提出，异步模块加载，不阻塞代码执行的模块引入，解决前端模块异步模块的加载问题

9. AMD & require.js

   * AMD和commonjs的区别是什么呢？AMD实现了异步加载，就算模块没有返回，也不影响后续代码的执行？？？？？咋办到的？
   * require.js办到惹
     * 通过define（）方法定义模块（根据是否依赖其它模块的模块定义分独立模块和非独立模块）
     * 模块的引用通过require（）方法
     * 内部做了什么呢？？？？？？

10. commonjs和AMD有什么共同点呢？

    * 两者都是运行时加载

    * 啥是运行时加载呢？代码运行的时候才能确定模块之间的依赖关系

      ```javascript
      // CommonJS模块
      let { basename, dirname, parse } = require('path')
      
      // 等价于
      let _path = require('path')
      let basename = _path.basename, dirname = _path.dirname, parse = _path.parse
      
      // 代码的实质就是先加载模块，然后进行方法的读取，这种加载就是‘运行时加载’，就是代码运行到require别的模块，先执行其他模块内的东西，再回来执行当前的内容呗
      ```

11. CMD又是咋回事儿呢？

    * CMD是国内的玉伯提出的，也是随着sea.js的推广出现的呢
    * 与AMD相比，CMD推崇**依赖就近，** AMD推崇**依赖前置**
    * CMD支持动态导入，把module，require，exports以形参的形式导入进来后，随时调用require进行引用

12. 以上三种模式着实火过一段时间，就一段时间罢了，后续出现了`ES6模块`，es6模块是语言层面实现了模块功能，是编译时加载（相对前面的运行时加载），完全可以成为浏览器和服务器通用的模块解决方案！！！！

13. es6模块的使用

    * export导出
    * import引入
    * 导出和导入都可以使用as进行重命名，可以利用as讲模块输出多次？？？？为啥这么干？？？
    * import命令有提升的效果，会提升到整个模块的头部，首先执行，nice
    * 整体模块加载可以使用*
    * export default，使用default命令时候，import不需要加{}，不使用必须加{}，这tm是为啥呢？？？
      * 因为export default其实是导出了一个叫做default的变量，所以其后面不能跟变量声明语句

14. es6模块的编译时加载和commonjs的运行时加载有什么区别呢？

    * es6中的导入和导出花括号是一种语法，并不是解构赋值

      ```javascript
      //es6模块
      import {basename, dirname, parse} from 'path'
      
      // commonjs模块
      const {basename, dirname, parse} = require('path')
      ```

    * 具体有什么区别呢？

      * require path模块时，commonjs会把path模块整个执行一遍，返回一个包含了所有的api的对象，并将这个对象缓存起来（就。。。整个加载了呗）。所以之后无论加载多少次这个模块，都是取得缓存里的值，即第一次运行的结果，除非手动清除（给跪了）

      * es6会从path模块只加载3个方法，其他的不会加载，即编译时加载。编译的时候做了什么呢？编辑过程中遇到import，不会执行模块，而是生成一个动态的只读引用，当真正用到的时候再根据引用去找到模块进行取值，所以es6是动态引用，并且没有缓存值。

      * commonjs模块输出的是值的缓存，所以模块内值变化的时候，不会影响导入的文件内输出的值，node环境下：

        ```javascript
        //person.js
        
        var age = 18
        module.exports = {
            age: age,
            addAge: function () {
                age ++
            }
        }
        
        // index.js
        var person = require('./person.js')
        console.log(person.age) // 18
        person.addAge()
        console.log(person.age) // 18 (nice 取得缓存里的值)
        ```

        es6情况下

        ```js
        // person.js
        export let age = 18
        export function addAge(){
            age++
        }
        
        //index.js
        import { age, addAge} from './person.js'
        console.log(age) // 18
        addAge()
        console.log(age) // 19 (就很棒)
        ```

        

为了解决问题出现了模块化的概念，即

* commonJs，以同步的方式加载模块，nodejs规范
* AMD（Asynchronous Module Definition），异步模块定义，浏览器