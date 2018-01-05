/**
 * Resource concerns
 * @module concerns
 */
'use strict'

const withCode = require('./withCode')
const withUser = require('./withUser')

module.exports = {
  withCode,
  withUser
}

exports.withCode = withCode
exports.withUser = withUser
