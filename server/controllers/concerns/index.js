/**
 * Controller concerns
 * @module concerns
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get withAdmin () { return _d(require('./withAdmin')) },
  get withAlias () { return _d(require('./withAlias')) },
  get withAuth () { return _d(require('./withAuth')) },
}
