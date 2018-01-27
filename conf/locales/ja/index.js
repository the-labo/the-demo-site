/**
 * ja locales
 * @module ja
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get alt () { return _d(require('./alt')) },
  get app () { return _d(require('./app')) },
  get buttons () { return _d(require('./buttons')) },
  get captions () { return _d(require('./captions')) },
  get checks () { return _d(require('./checks')) },
  get errors () { return _d(require('./errors')) },
  get labels () { return _d(require('./labels')) },
  get leads () { return _d(require('./leads')) },
  get mail () { return _d(require('./mail')) },
  get messages () { return _d(require('./messages')) },
  get org () { return _d(require('./org')) },
  get placeholders () { return _d(require('./placeholders')) },
  get roleCodes () { return _d(require('./roleCodes')) },
  get tabs () { return _d(require('./tabs')) },
  get titles () { return _d(require('./titles')) },
  get toasts () { return _d(require('./toasts')) },
  get warnings () { return _d(require('./warnings')) },
}
