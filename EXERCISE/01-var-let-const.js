var a = [];
// var i = 0
// for(i = 0; i < 10; i++) {
//   a[i] = function() {
//     console.log(i)
//   }
// }

// while (i< 10) {
//     a.push(function (params) {
//         console.log(i)
//     })
//     i++
// }

// a[1]()

// var a = [];
// for(let i = 0; i < 10; i++) {
//   a[i] = function() {
//     console.log(i)
//   }
// }
// a[6]()


// 闭包的方式输出6
var a = [];
for(var i = 0; i < 10; i++) {
  a[i] = (function (i) {
    return function() {
      console.log(i)
    }
  })(i)
}
a[6]()