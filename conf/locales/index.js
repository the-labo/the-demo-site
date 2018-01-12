'use strict'

const theLoc = require('the-loc').default

const loc = theLoc({
  en: require('./en'),
  ja: require('./ja')
}, {
  buildin: true
})

module.exports = loc

