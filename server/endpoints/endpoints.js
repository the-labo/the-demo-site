'use strict'

const rt = require('./routes')
const mw = require('./middlewares')

module.exports = Object.freeze({
  '/a/:key': rt.aliasRoute
})