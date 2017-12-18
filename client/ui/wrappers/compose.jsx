/**
 * Compose multiple mixins into one
 * @function compose
 * @param {...function|Array} mixins
 * @returns {function} Composed mixin
 */
'use strict'

/** @lends compose */
function compose (...mixins) {
  return function composed (Class) {
    return mixins.reduce((Class, mix) => {
      return mix(...[].concat(Class, mix))
    }, Class)
  }
}

export default compose
