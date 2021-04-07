var name = "02-export"

function hello(){
    console.log('hello');
}

// 类
class Person { }

// 重命名导出的变量名
export { name, hello, Person as Human }