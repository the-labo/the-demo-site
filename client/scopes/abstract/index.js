/**
 * scopes
 * @module scopes
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get check () { return _d(require('./check')) },
  get input () { return _d(require('./input')) },
  get list () { return _d(require('./list')) },
  get process () { return _d(require('./process')) },
}
