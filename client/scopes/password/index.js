/**
 * scopes
 * @module scopes
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get change () { return _d(require('./change')) },
}
