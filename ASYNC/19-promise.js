Promise.resolve(1).then((res) => {
    console.log(res);
    return 2
})
.catch((err) => {
    return 3
})
.then((res) => {
    console.log(res);
})


Promise.resolve(1).then(2).then(
    Promise.resolve(3)
).then(console.log;)