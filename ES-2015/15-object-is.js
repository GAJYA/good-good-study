// Object.is

console.log(
    // 0 == false
    // 0 === false
    // 对于0，正负无法区分，对于应用来讲无影响
    // +0 === -0
    // NaN代表一个特别的值，代表无限可能，所以三等判断是false
    // NaN === NaN
    Object.is(NaN,NaN)
);