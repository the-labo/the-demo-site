/**
 * Controller concerns
 * @module concerns
 */
'use strict'

const compose = require('./compose')
const withAdmin = require('./withAdmin')
const withAuth = require('./withAuth')
const withDebug = require('./withDebug')

module.exports = {
  compose,
  withAdmin,
  withAuth,
  withDebug
}
