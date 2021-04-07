const obj ={name: 'tom'}

const name = 'jack'
const {name:objName = 'jack'} = obj
console.log(objName);

const fn = n => n +1