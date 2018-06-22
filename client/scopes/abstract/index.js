// Code generated by coz. DO NOT EDIT.
/**
 * scopes
 * @module scopes
 */
'use strict'

const _d = (m) => (m && 'default' in m) ? m.default : m

const call_ = require('./call')
const detail_ = require('./detail')
const filter_ = require('./filter')
const hash_ = require('./hash')
const input_ = require('./input')
const list_ = require('./list')
const process_ = require('./process')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.call = _d(call_)
exports.detail = _d(detail_)
exports.filter = _d(filter_)
exports.hash = _d(hash_)
exports.input = _d(input_)
exports.list = _d(list_)
exports.process = _d(process_)

module.exports = {
  call: _d(call_),
  detail: _d(detail_),
  filter: _d(filter_),
  hash: _d(hash_),
  input: _d(input_),
  list: _d(list_),
  process: _d(process_),
}
