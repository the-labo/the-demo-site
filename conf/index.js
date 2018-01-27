/**
 * Project configurations
 * @module conf
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get GlobalKeys () { return _d(require('./GlobalKeys')) },
  get HistoryTypes () { return _d(require('./HistoryTypes')) },
  get Icons () { return _d(require('./Icons')) },
  get Lifetimes () { return _d(require('./Lifetimes')) },
  get LocaleNames () { return _d(require('./LocaleNames')) },
  get RoleCodes () { return _d(require('./RoleCodes')) },
  get Styles () { return _d(require('./Styles')) },
  get UI () { return _d(require('./UI')) },
  get Urls () { return _d(require('./Urls')) },
  get locales () { return _d(require('./locales')) },
}
