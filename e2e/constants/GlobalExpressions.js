/**
 * Expression for global scope
 * @enum {string} GlobalExpressions
 */
'use strict'

const {Urls, GlobalKeys} = require('../../conf')

module.exports = Object.freeze(
  /** @lends GlobalExpressions */
  {
    appStageExpression: [GlobalKeys.APP, GlobalKeys.STAGE].map((v) => `window.${v}`).join(' &&')
  }
)
