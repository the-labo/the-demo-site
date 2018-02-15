/**
 * scopes
 * @module scopes
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get call () { return _d(require('./call')) },
  get detail () { return _d(require('./detail')) },
  get filter () { return _d(require('./filter')) },
  get hash () { return _d(require('./hash')) },
  get input () { return _d(require('./input')) },
  get list () { return _d(require('./list')) },
  get process () { return _d(require('./process')) },
}
