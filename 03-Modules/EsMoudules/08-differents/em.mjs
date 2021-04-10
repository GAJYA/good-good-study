// console.log(__filename)

// ESM中没有commonjs中的那些模块全局成员了

console.log(import.meta.url)

import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__filename)
console.log(__dirname)
