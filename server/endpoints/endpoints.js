'use strict'

const { Urls } = require('@self/conf')
const mw = require('./middlewares')
const rt = require('./routes')

module.exports = Object.freeze({
  [Urls.ALIAS_URL]: rt.aliasRoute,
})
