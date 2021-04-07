const { src, dest } = require('gulp')
// 安装gulp-clean-css插件来转换css
// 安装gulp-rename插件来重命名文件名
const transfrom = require('gulp-clean-css')
const rename = require('gulp-rename')

exports.default = () => {
    // return src('./src/*.css').pipe(dest('dist'))
    // return src('./src/normalize.css').pipe(dest('dist'))
    return src('./src/*.css')
        .pipe(transfrom())
        .pipe(rename({extname:'.min.css'}))
        .pipe(dest('dist'))
}