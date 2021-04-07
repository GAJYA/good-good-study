// @flow

function square(n: number){
    return n * n
}

let num: number = 100
// num = 'string'

// square('12')

// 标记函数的返回值
// 如果函数无返回值，默认返回undefined，设置为void
function foo (): number {
    return 100
    // return 'string'
}

function foo (): void {

}