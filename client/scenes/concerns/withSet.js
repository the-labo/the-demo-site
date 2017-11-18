/**
 * withSet mixin
 * @function withSet
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

/** @lends withSet */
function withSet (Class) {
  class WithSet extends Class {
    set (name, value) {
      const s = this
      const byObj = arguments.length === 1 && typeof arguments[0] === 'object'
      if (byObj) {
        for (const [name, value] of Object.entries(arguments[0])) {
          s.set(name, value)
        }
        return
      }
      const scope = s.scope[name]
      if (!scope) {
        throw new Error(`Unknown scope: ${name}`)
      }
      scope.set(value)
    }
  }

  return WithSet
}

module.exports = withSet
