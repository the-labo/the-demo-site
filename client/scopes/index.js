/**
 * scopes
 * @module scopes
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get abstract () { return _d(require('./abstract')) },
  get account () { return _d(require('./account')) },
  get admin () { return _d(require('./admin')) },
  get app () { return _d(require('./app')) },
  get caution () { return _d(require('./caution')) },
  get password () { return _d(require('./password')) },
  get profile () { return _d(require('./profile')) },
  get quit () { return _d(require('./quit')) },
  get recover () { return _d(require('./recover')) },
  get sign () { return _d(require('./sign')) },
  get toast () { return _d(require('./toast')) },
  get verify () { return _d(require('./verify')) },
}
