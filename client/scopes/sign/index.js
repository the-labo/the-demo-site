/**
 * scopes
 * @module scopes
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get ask () { return _d(require('./ask')) },
  get in () { return _d(require('./in')) },
  get out () { return _d(require('./out')) },
  get up () { return _d(require('./up')) },
}
