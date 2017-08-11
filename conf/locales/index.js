'use strict'

const theLoc = require('the-loc')

const env = theLoc({
  en: require('./en')
}, {
  buildin: true
})

module.exports = env
