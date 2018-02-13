/**
 * Abstract scenes
 * @module scenes
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get CallScene () { return _d(require('./CallScene')) },
  get DetailScene () { return _d(require('./DetailScene')) },
  get InputScene () { return _d(require('./InputScene')) },
  get ListScene () { return _d(require('./ListScene')) },
  get ProcessScene () { return _d(require('./ProcessScene')) },
  get Scene () { return _d(require('./Scene')) },
}
