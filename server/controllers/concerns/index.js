/**
 * Controller concerns
 * @module concerns
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const withAdmin = _d(require('./withAdmin'))
const withAlias = _d(require('./withAlias'))
const withAuth = _d(require('./withAuth'))
const withPreference = _d(require('./withPreference'))

module.exports = {
  withAdmin,
  withAlias,
  withAuth,
  withPreference,
}
