/**
 * Endpoint routes
 * @module routes
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const aliasRoute = _d(require('./aliasRoute'))
const uploadRoute = _d(require('./uploadRoute'))

module.exports = {
  aliasRoute,
  uploadRoute,
}
