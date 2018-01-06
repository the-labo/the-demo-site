'use strict'

const theLoc = require('the-loc')

const loc = theLoc({
  en: require('./en'),
  ja: require('./ja')
}, {
  buildin: true
})

module.exports = loc

