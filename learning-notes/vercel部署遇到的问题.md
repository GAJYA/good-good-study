## vercel部署遇到的问题

1. ### 解决 HTTPS 协议下不能请求 HTTP 协议接口问题

   

   项目中使用的接口是 HTTP 协议，而 Vercel 中部署的网站是 HTTPS 协议，由于在 HTTPS 协议下无法请求 HTTP 协议的接口，所以我们可以通过一些手段来解决这个问题。

   

   - 一种方式是让我们的项目接口提供 https 协议支持（nginx配置应该可，但是strapi怎么配置不会）
   - 还有一种是配置服务端代理

   

   1、安装代理插件

   ```bash
   npm i http-proxy-middleware
   ```

   2、在项目根目录下添加 Vercel 配置文件 `vercel.json`

   ```json
   {
     "routes": [
       { // 所有以 /api/boss/ 开头的请求转发到 /api/proxy
         "src": "/api/boss/(.*)",
         "dest": "/api/proxy"
       },
       { // 所有以 /api/front/ 开头的请求转发到 /api/proxy
         "src": "/api/front/(.*)",
         "dest": "/api/proxy"
       }
     ]
   }
   ```

   注意：JSON 文件中是不能有注释的！！！

   Vercel 配置文档：https://vercel.com/docs/configuration

   3、在项目根目录下创建 `api/proxy.js` 处理代理

   ```js
   /* eslint-disable @typescript-eslint/no-var-requires */
   const { createProxyMiddleware } = require('http-proxy-middleware')
   
   module.exports = (req, res) => {
     let target = ''
     
     // 处理代理目标地址
     // 处理代理目标地址
     // 接口配置baseurl: api
     // uploads可以处理静态图片不展示的问题
     if (req.url.startsWith("/api") || req.url.startsWith("/uploads")) {
       target = "http://121.5.240.208:1337/";
     }
     /*
     if (req.url.includes('/api/front')) {
       target = 'http://edufront.lagou.com/'
     } else if (req.url.startsWith('/api/boss')) {
       target = 'http://eduboss.lagou.com/'
     }
     */
     
     // 创建代理对象并转发请求
     createProxyMiddleware({
       target,
       changeOrigin: true,
       pathRewrite: {
         // 通过路径重写，去除请求路径中的 /api
         //   例如 /api/boss/xxx 将被转发到 http://eduboss.lagou.com/boss/xxx
         //   例如 /api/front/xxx 将被转发到 http://eduboss.lagou.com/front/xxx
         '^/api/': ''
       }
     })(req, res)
   }
   ```

   使用 Vercel，您可以部署无服务器功能，这是用后端语言编写的代码片段，这些代码接受 HTTP 请求并提供响应。

   更多内容参考：https://vercel.com/docs/serverless-functions/introduction。

   `打包失败：`

   Deployment failed with the following error:

   ```bash
   If `rewrites`, `redirects`, `headers`, `cleanUrls` or `trailingSlash` are used, then `routes` cannot be present.
   ```

   握草。。。。。。。。。。。。我脾气超好！！！！

2. ### gridsome 部署到 vercel 后图片无法显示

   **现象：**

   将 gridsome 项目部署到 vercel 后 图片不能正常显示

   **原因：**

   vercel 本身是 https 协议的，而我们项目中请求的图片是 http 协议

   在谷歌浏览器下，http 的请求会被自动变成 https 的请求，于是找不到相应的图片

   **解决办法：**

   1）把图片 src 中域名部分都去掉，最终渲染为如下面这样：

   ```html
   <img src="/upload/xxxx.jpg">
   ```

   2）在项目根目录下创建「 vercel.json 」文件

   ```json
   {
     "rewrites": [
       {
         "source": "/uploads/:match*",
         "destination": "http://106.75.9.111:1337/uploads/:match*"
       }
     ]
   }
   ```

   注意：

   - 修改为自己服务器的 IP 地址
   - 参考官方文档：https://vercel.com/docs/configuration#project/rewrites
   - 只解决图片等静态资源的路由

   （ E N D ）

   **注意match的写法。。。**

3. **vercel自动部署的前提是代码没有报错，如果有报错的情况，会直接deploy失败**

   ![image-20210709111159833](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20210709111159833.png)

4.  打包失败，提示

   ```bash
   23:33:19.601  	Could not generate HTML for "/post/2/":
   23:33:19.604  	TypeError: Cannot read property 'url' of null
   23:33:19.604  	    at a.render (src/templates/Post.vue?b23b:1:153)
   23:33:19.604  	    at a.t._render (/vercel/path0/node_modules/vue/dist/vue.runtime.common.prod.js:6:35273)
   ```

   问题原因： 没有给文章设置图片，找不到图片的url地址。。。。。。

5. 打包失败，提示

   ```bash
   22:04:11.847  	Initializing plugins...
   22:04:11.965  	Fetching data from Strapi (121.5.240.208:1337)
   22:04:11.978  	Unable to get content type (posts). Did you enable permissions in the Strapi admin for this?
   22:04:11.979  	Error: connect EINVAL 0.0.5.57:80 - Local (0.0.0.0:0)
   22:04:11.979  	    at internalConnect (net.js:923:16)
   22:04:11.979  	    at defaultTriggerAsyncIdScope (internal/async_hooks.js:435:18)
   ```

   问题分析：

   1.  检查对应的角色public，对应的集合posts是否开了权限，并保证已保存
   2. 检查设置的GRIDSOME_API_URL是否如上`121.5.240.208:1337`只有ip地址没有加协议http，需要设置成`http://121.5.240.208:1337`

6. 打包失败，提示

   ```bash
   23:27:32.649  	warning url-loader@1.1.2: Invalid bin field for "url-loader".
   23:30:33.689  	error An unexpected error occurred: "https://registry.npm.taobao.org/spdx-expression-parse/download/spdx-expression-parse-3.0.1.tgz: Request failed \"504 Gateway Timeout\"".
   23:30:33.689  	info If you think this is a bug, please open a bug report with the information provided in "/vercel/path0/yarn-error.log".
   23:30:33.689  	info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
   23:30:33.712  	Error: Command "yarn install" exited with 1
   ```

   504 gatway error。。。。。。。兄dei，请稍后重试吧

