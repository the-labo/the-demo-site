/**
 * scopes
 * @module scopes
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get reset () { return _d(require('./reset')) },
  get send () { return _d(require('./send')) },
}