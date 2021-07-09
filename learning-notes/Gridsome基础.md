## Gridsome基础

安装使用

- Using **YARN:**`yarn global add @gridsome/cli`
- Using **NPM:**`npm install --global @gridsome/cli`

创建项目

1. `gridsome create my-gridsome-site` to create a new project
2. `cd my-gridsome-site` to move into project directory
3. `gridsome develop` to start local dev server at `http://localhost:8080`

build

1. Create `.vue` components in the `src/pages` directory to create page routes.
2. Use `gridsome build` to generate static files in a `/dist` folder

### 集合 collection

1. 需要预渲染数据（默认接口调用等是客户端动态调用生成的）
2. 通过插件设置集合
3. 使用数据存储api
4. 使用query



模板collection

修改配置文件

动态修改title的名字可以使用函数的方式，此时可以访问到this

![image-20210706143906108](C:\Users\luoli\AppData\Roaming\Typora\typora-user-images\image-20210706143906108.png)

