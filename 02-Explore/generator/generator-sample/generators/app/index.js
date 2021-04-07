const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    writing() {
        this.fs.write(this.destinationPath('tmp.txt'), "whatever you say")
    }
}      