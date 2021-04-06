// 引入generator包
// 导出一个继承自generator类
const Generator = require("yeoman-generator")

module.exports = class extends Generator{
    prompting() {
        // yeoman
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname //appname为项目生成目录名称
            }
        ]).then(answers => {
            this.answers = answers
        })
    }
    writing() {
    //     // this.fs.write(this.destinationPath('tmp.txt'), 'whatever you say, i will never be defeated')

    //     // 使用模板方式写入文件到目标目录

    //     // 模板文件路径
        // const tmpl = this.templatePath('foo.txt')
        const tmpl = this.templatePath('bar.html')
    //     // 输出目标路径
        // const output = this.destinationPath('template.txt')
        const output = this.destinationPath('bar.html')
    //     // 传入的模板数据内容
        // const context = {title:'Hay, babe', success: true}
        const context = this.answers

        this.fs.copyTpl(tmpl, output, context)

    }
}