/**
 * Controller concerns
 * @module concerns
 */
'use strict'

const withAdmin = require('./withAdmin')
const withAuthorized = require('./withAuthorized')
const withDebug = require('./withDebug')

module.exports = {
  withAdmin,
  withAuthorized,
  withDebug
}
