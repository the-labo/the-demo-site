/**
 * Controller concerns
 * @module concerns
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const withAdmin = _d(require('./withAdmin'))
const withAlias = _d(require('./withAlias'))
const withAuth = _d(require('./withAuth'))

module.exports = {
  withAdmin,
  withAlias,
  withAuth,
}
