/**
 * withList mixin
 * @function withList
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

/** @lends withList */
function withList (Class) {
  class WithList extends Class {
    setList (list) {
      const {
        meta: {total, offset, limit},
        entities
      } = list
      const s = this
      s.set({
        counts: {total, offset, limit},
        entities
      })
    }
  }

  return WithList
}

module.exports = withList
