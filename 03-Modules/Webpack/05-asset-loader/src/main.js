import createHeading from './heading.js'
import './main.css'
import icon from './123.jpg'

const heading = createHeading()

document.body.append(heading)

const img = new Image()
img.src = icon

document.body.append(img)