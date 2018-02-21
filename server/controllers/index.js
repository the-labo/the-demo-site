/**
 * Server controllers
 * @module controllers
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get AccountCtrl () { return _d(require('./AccountCtrl')) },
  get AdminUserCtrl () { return _d(require('./admin/AdminUserCtrl')) },
  get AdminCtrl () { return _d(require('./AdminCtrl')) },
  get AppCtrl () { return _d(require('./AppCtrl')) },
  get Ctrl () { return _d(require('./Ctrl')) },
  get ListenCtrl () { return _d(require('./ListenCtrl')) },
  get QuitCtrl () { return _d(require('./QuitCtrl')) },
  get RecoverCtrl () { return _d(require('./RecoverCtrl')) },
  get SignCtrl () { return _d(require('./SignCtrl')) },
  get VerifyCtrl () { return _d(require('./VerifyCtrl')) },
}
