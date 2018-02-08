/**
 * scopes
 * @module scopes
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get confirm () { return _d(require('./confirm')) },
  get need () { return _d(require('./need')) },
  get send () { return _d(require('./send')) },
}