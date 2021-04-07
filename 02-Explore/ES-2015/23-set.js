// set数据结构
// 可以理解为集合，set内部的成员不允许重复，每个值在set中都是唯一的
const s = new Set()

s.add(1).add(2).add(3)
console.log(s);

s.forEach(i => console.log(i))

console.log(s.size);

console.log(s.has(12));
console.log(s.has(1));
// 删除成功返回一个true
console.log(s.delete(3));

// 常见应用场景，去重
const arr = [1,2,3,4,3,2]

const res = Array.from(new Set(arr))

const res2 = [... new Set(arr)]

console.log(res);
console.log(res2);
