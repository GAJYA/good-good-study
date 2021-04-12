import createHeading from './heading.js'
import './main.css'
import icon from './123.jpg'
import footerHtml from './footer.html'
import readme from '../readme.md'

console.log(readme);

const heading = createHeading()

document.body.append(heading)

const img = new Image()
img.src = icon

document.body.append(img)
document.write(footerHtml)
