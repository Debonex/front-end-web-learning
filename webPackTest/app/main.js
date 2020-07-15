const divMaker = require('./div-maker')
const config = require('./main.config.json')
import './main.css'
var container = document.getElementById('app')
container.append(divMaker(config.div1Text))
container.append(divMaker(config.div2Text))