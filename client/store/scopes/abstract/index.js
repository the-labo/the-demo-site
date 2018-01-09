/**
 * Abstract scopes
 * @module abstract
 */
'use strict'

const check = require('./check')
const input = require('./input')
const list = require('./list')
const process = require('./process')

module.exports = {
  check,
  input,
  list,
  process
}

exports.check = check
exports.input = input
exports.list = list
exports.process = process
