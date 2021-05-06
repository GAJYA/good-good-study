# vue项目Base64格式PDF预览

### 需求

在web上加载pdf文件

调研后决定使用pdf.js文件，因为直接引入项目文件过大，本来已经够慢了，再来个这，得，甭玩儿了。所以选择使用npm进行安装

### 安装

```bash
npm install pdfjs-dist --save
```

此处有坑，pdfjs-dist建议指定版本，否则，默认最新版本，不知道会出现什么幺蛾子呢，多方打探，最终选定版本`"pdfjs-dist": "2.2.228"`

### PDF加载

#### 导入pdfjs库

pdfjs-dist/webpack是已经对pdfjs打包过的文件，不使用'/webpack'可能出现的问题

```js
import pdfjsLib from 'pdfjs-dist/webpack'; # 啊这。。。可能并不能完全解决你的后顾之忧，可太惨了
```

**直接导入pdfjs出现的问题**

- 不容易找到pdf.worker.js
  pdf.worker.js是pdfjs解析库，使用时需要在pdfjs对象上指定属性workerSrc=pdf.worker.js
- 内存使用过高
  即使在module找到了，也还可能报high memory的错误
  错误原因[issue](https://github.com/mozilla/pdf.js/issues/11410)上已经提到了

### 完整代码

```vue
<template>
  <div class="pdfList">
<!--    <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>-->
  </div>
</template>
<script>
  import LStorage from '@/public/LStorage';
  import PDF from "pdfjs-dist";
  PDF.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';
  export default {
    name: 'PDFDetail',
    data() {
      return {
        pages: null,
      };
    },
    computed:{
      PDFData(){
        return  LStorage.getItem('pdfData');
      }
    },
    mounted() {
      this._loadFile();
    },
    methods: {
      //加载PDF
      async _loadFile() {
        let pdfList = document.querySelector('.pdfList')
        const pdf = await PDF.getDocument({data:
            atob(this.PDFData),
        })
        const {_pdfInfo: {numPages}} = pdf
        for (let _page = 1; _page <= numPages; _page++) {
          pdf.getPage(_page).then((page) => {
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            const scale = document.body.getBoundingClientRect().width / page.view[2];
            const viewport = page.getViewport({scale})
            canvas.width = viewport.width // 画布大小
            canvas.height = viewport.height
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
              enableWebGL: true,
            }
            page.render(renderContext)
            canvas.className = 'canvas'
            pdfList.appendChild(canvas)
          });
        }
      },

    }
  };
</script>
<style lang="scss" scoped>
  .pdfList{
    margin: 0 auto;
  }
</style>

```

# 踩坑

- 遇到问题：

  1. **pdf加载失败**

     原因：姑且认为是版本原因

     解决方案：

     ```
     `"pdfjs-dist": "2.2.228"` //换了这个版本
     ```

  2. ### 使用webpack后，在firefox中无法加载pdf。/项目部署后，控制台报<hash>.worker.js 404

     - 原因：使用webpack时，需要设置pdf worker的打包后文件目录。
     - 解决方案：https://github.com/wojtekmaj/react-pdf/issues/97

     ```
     import PDF from "pdfjs-dist";
      PDF.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';
      
      
     // webpack配置
     entry: {
         //系统入口js文件
         app: "./src/main.js",
         'pdf.worker': path.join(process.cwd(), 'node_modules/pdfjs-dist/build/pdf.worker.entry')
     
     },
     output: {
         path: config.build.assetsRoot,
         filename: './[name].js',
         publicPath: process.env.NODE_ENV === "production"
           ? config.build.assetsPublicPath
           : config.dev.assetsPublicPath
     }, 
     ```