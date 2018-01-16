'use strict'

const {Urls} = require('@self/conf')
const rt = require('./routes')
const mw = require('./middlewares')

module.exports = Object.freeze({
  [Urls.ALIAS_URL]: rt.aliasRoute,
  [Urls.STATUS_URL]: rt.statusRoute,
})