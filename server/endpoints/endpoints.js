'use strict'

const rt = require('./routes')

module.exports = Object.freeze({
  '/a/:key': rt.aliasRoute
})