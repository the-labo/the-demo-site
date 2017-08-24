'use strict'

const theLoc = require('the-loc')

const loc = theLoc({
  en: require('./en')
}, {
  buildin: true
})

module.exports = loc
