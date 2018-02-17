/**
 * Server middlewares
 * @module middlewares
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get tokenMW () { return _d(require('./tokenMW')) },
}
