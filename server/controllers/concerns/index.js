/**
 * Controller concerns
 * @module concerns
 */
'use strict'

const compose = require('./compose')
const withAdmin = require('./withAdmin')
const withAlias = require('./withAlias')
const withAuth = require('./withAuth')
const withDebug = require('./withDebug')

module.exports = {
  compose,
  withAdmin,
  withAlias,
  withAuth,
  withDebug,
}
