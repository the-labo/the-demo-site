/**
 * Module mappings
 * @module mappings
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get ControllerMapping () { return _d(require('./ControllerMapping')) },
  get HookMapping () { return _d(require('./HookMapping')) },
  get ResourceMapping () { return _d(require('./ResourceMapping')) },
  get ServiceMapping () { return _d(require('./ServiceMapping')) },
}
