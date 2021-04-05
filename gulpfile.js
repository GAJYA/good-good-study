const { src, dest, series, parallel, watch } = require('gulp')
const del = require('del')
// 自动加载插件 gulp-load-plugins，导出的是一个方法，调用方法后可以直接使用gulp插件后的名字，
// 如果插件是gulp-ad-bc的形式，会自动转换为驼峰命名，可以使用plugins.adBc的形式调用
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()

const bs = require('browser-sync')

// 原始的导入方法
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const swig = require('gulp-swig')
const imagemin = require('gulp-imagemin')

const data = {
    menus: [
      {
        name: 'Home',
        icon: 'aperture',
        link: 'index.html'
      },
      {
        name: 'Features',
        link: 'features.html'
      },
      {
        name: 'About',
        link: 'about.html'
      },
      {
        name: 'Contact',
        link: '#',
        children: [
          {
            name: 'Twitter',
            link: 'https://twitter.com/w_zce'
          },
          {
            name: 'About',
            link: 'https://weibo.com/zceme'
          },
          {
            name: 'divider'
          },
          {
            name: 'LunaJan',
            link: 'https://github.com/zce'
          }
        ]
      }
    ],
    pkg: require('./package.json'),
    date: new Date()
  }
  
// 文件清除，del模块，非gulp插件，但是gulp可以使用
const clean = () =>{
    return del(['dist', 'tmp'])
}

// 使用gulp-sass插件把sass文件转换为css放在dist文件下
const style = () => {
    // 第二个参数指定
    return src('src/assets/styles/*.scss', { base: 'src'})
    // sass内部约定不会导出文件名是_开头的文件
    // 通过output style参数指定css的样式，如最后的大括号单独占据一行
        .pipe(plugins.sass({outputStyle: 'expanded'}))
        .pipe(dest('tmp'))
        .pipe(bs.reload({stream: true})) //添加后就不需要bs.init()配置files
}

// 脚本的编译，使用gulp-babel转换，安装后可能报错，还需要安装@babel/core和@babel/preset-env
const script = () => {
    return src('src/assets/scripts/*.js', {base: 'src'})
    // babel不指定版本的话，转换不起作用
        // .pipe(babel())
        .pipe(plugins.babel({presets: ['@babel/preset-env']}))
        .pipe(dest('tmp'))
}

// html等模板文件，使用gulp-swig模板引擎的转换插件
const page = () => {
    return src('src/**/*.html', {base: 'src'})
    // 传入模板需要的数据
        .pipe(plugins.swig({data}))
        .pipe(dest('tmp'))
}
// 图片、字体文件转换，使用插件gulp-imagemin
const img = () => {
    return src('src/assets/images/*', {base:'src'})
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}
const font = () => {
    return src('src/assets/fonts/*', {base:'src'})
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}
// 其他文件，直接copy过去
const extra = () => {
    return src('public/**', {base: 'public'})
        .pipe(dest('dist'))
}

// browser-sync插件启用热更新
// 通过routes配置默认读取路径、notify、port端口号、open自动打开浏览器、files指定监听哪些文件
const serve = () => {
    // watch监视到，img，font，public等在开发过程中不需要编译，变化不大，上线前再进行编译
    // 当这些图片等资源发生变化时，可以调用bs.reload()方法进行重新加载
    // watch监听到样式脚本等变化后执行编译任务实现实时更新
    // serve要在编译后执行
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch('src/**/*.html', page)
    watch([
        'src/assets/iamges/**',
        'src/assets/fonts/**',
        'public/**'
    ], bs.reload)

    bs.init({
        port: '3333',
        // files: 'dist/**',
        server: {
            // 可以为一个数组，在第一个目录下没有找到对应的文件会依次向下寻找
            baseDir: ['tmp', 'src', 'public'],
            // baseDir: 'dist',
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    })
}

// useref插件，引用关系，会把库等合并到一个文件中
// 在编译后再使用，文件入口地址为dist
const useref = () => {
    // 读取文件和写入文件的路径一致情况下可能出现写入不成功
    return src('tmp/*.html', {base: 'tmp'})
        .pipe(plugins.useref({ searchPath: ['tmp', '.'] }))
        // html js css
        // 进行压缩 分别使用gulp-htmlmin gulp-uglify gulp-clean-css
        // gulp-if进行判断
        .pipe(plugins.if(/\.js$/, plugins.uglify()))
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
        .pipe(plugins.if(/\.html$/, plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        })))
        .pipe(dest('dist'))
        // .pipe(dest('dist'))
}
// 创建一个组合任务组合起来
// 三者互不影响，可以使用并行方式
const compose = parallel(style, script, page)
// 上线前执行
const build = series(clean, parallel(series(compose, useref), extra,  img, font))
// 开发环境
const develop = series(compose, serve)
// module.exports = {
//     clean,
//     style,
//     script,
//     page,
//     img,
//     font,
//     extra,
//     serve,
//     compose,
//     build,
//     develop,
//     useref,
// }

// 开发阶段的编译可以放在temp文件中
module.exports = {
    clean,
    develop,
    build
}