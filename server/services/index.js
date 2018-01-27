/**
 * Server services
 * @module services
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get AccountService () { return _d(require('./AccountService')) },
  get QuitService () { return _d(require('./QuitService')) },
  get RecoverService () { return _d(require('./RecoverService')) },
  get SignService () { return _d(require('./SignService')) },
  get UserService () { return _d(require('./UserService')) },
  get VerifyService () { return _d(require('./VerifyService')) },
}
