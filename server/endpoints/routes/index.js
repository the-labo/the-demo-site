/**
 * Endpoint routes
 * @module routes
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get aliasRoute () { return _d(require('./aliasRoute')) },
  get uploadRoute () { return _d(require('./uploadRoute')) },
}
