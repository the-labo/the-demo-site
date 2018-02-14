/**
 * scopes
 * @module scopes
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get check () { return _d(require('./check')) },
  get create () { return _d(require('./create')) },
  get destroy () { return _d(require('./destroy')) },
  get filter () { return _d(require('./filter')) },
  get list () { return _d(require('./list')) },
  get password () { return _d(require('./password')) },
  get role () { return _d(require('./role')) },
}
