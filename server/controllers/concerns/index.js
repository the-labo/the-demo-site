/**
 * Controller concerns
 * @module concerns
 */
'use strict'

const withAdmin = require('./withAdmin')
const withDebug = require('./withDebug')
const withSigned = require('./withSigned')

module.exports = {
  withAdmin,
  withDebug,
  withSigned
}
