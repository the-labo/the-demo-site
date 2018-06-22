'use strict'

const {TheLoc} = require('the-loc')

const loc = new TheLoc({
  en: require('./en'),
  ja: require('./ja')
}, {
  buildin: true
})

module.exports = loc

