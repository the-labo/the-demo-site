// Code generated by coz. DO NOT EDIT.
/**
 * scopes
 * @module scopes
 */
'use strict'

const _d = (m) => (m && 'default' in m) ? m.default : m

const ask_ = require('./ask')
const in__ = require('./in')
const out_ = require('./out')
const up_ = require('./up')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.ask = _d(ask_)
exports.in = _d(in__)
exports.out = _d(out_)
exports.up = _d(up_)

module.exports = {
  ask: _d(ask_),
  in: _d(in__),
  out: _d(out_),
  up: _d(up_),
}
