/**
 *  Role Codes
 *  @enum {string} RoleCodes
 */
'use strict'

const { isProduction } = require('the-check')
const { hashProxy } = require('the-site-util')

module.exports = Object.freeze(
  /** @lends RoleCodes */
  {
    ADMIN_ROLE: 'ADMIN',
    NORMAL_ROLE: 'NORMAL',
  }
)

if (!isProduction()) {
  module.exports = hashProxy(module.exports, { name: 'HistoryTypes', unknownCheck: true })
}
