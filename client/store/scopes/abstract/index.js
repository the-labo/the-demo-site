/**
 * Abstract scopes
 * @module abstract
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const check = _d(require('./check'))
const input = _d(require('./input'))
const list = _d(require('./list'))
const process = _d(require('./process'))

module.exports = {
  check,
  input,
  list,
  process,
}
