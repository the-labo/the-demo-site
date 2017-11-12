/**
 * Controller concerns
 * @module concerns
 */
'use strict'

const compose = require('./compose')
const withAdmin = require('./withAdmin')
const withAuthorized = require('./withAuthorized')
const withDebug = require('./withDebug')

module.exports = {
  compose,
  withAdmin,
  withAuthorized,
  withDebug
}
