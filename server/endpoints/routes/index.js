/**
 * Endpoint routes
 * @module routes
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const aliasRoute = _d(require('./aliasRoute'))
const statusRoute = _d(require('./statusRoute'))

module.exports = {
  aliasRoute,
  statusRoute,
}
