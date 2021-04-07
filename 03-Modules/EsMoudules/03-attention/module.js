let name = "03-attention"
let age = 18

// 对象字面量
let object= {
    age: age,
    name  // 对象字面量
}
// export这种是规定，要求这么写，不是字面量
export { name, age }
// 导出的是一个引用

setTimeout(() => {
   name = 'lunaJan'
},1000)
// export default是字面量形式
// export default {
//     name,
//     age
// }