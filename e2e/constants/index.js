// Code generated by coz. DO NOT EDIT.
/**
 * Constant variables
 * @module constants
 */
'use strict'

const _d = (m) => (m && 'default' in m) ? m.default : m

const E2EConfig_ = require('./E2EConfig')
const GlobalExpressions_ = require('./GlobalExpressions')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.E2EConfig = _d(E2EConfig_)
exports.GlobalExpressions = _d(GlobalExpressions_)

module.exports = Object.freeze({
  E2EConfig: _d(E2EConfig_),
  GlobalExpressions: _d(GlobalExpressions_),
})
