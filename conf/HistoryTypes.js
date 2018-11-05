/**
 * History type values
 * @enum {string} HistoryTypes
 */
'use strict'

const { isProduction } = require('the-check')
const { hashProxy } = require('the-site-util')

module.exports = Object.freeze(
  /** @lends HistoryTypes */
  {
    GONE_USER: 'gone:user',
  }
)

if (!isProduction()) {
  module.exports = hashProxy(module.exports, { name: 'HistoryTypes', unknownCheck: true })
}
