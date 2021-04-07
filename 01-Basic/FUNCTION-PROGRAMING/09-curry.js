// 柯里化

for (var i = 0; i < 6; i++) {
    (function(i) {
        setTimeout(() => {
            console.log(i)
        })
    })(i)
  }

  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
        console.log(i)
    })
  }
