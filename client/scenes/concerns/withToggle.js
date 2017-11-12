/**
 * withToggle mixin
 * @function withToggle
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

/** @lends withToggle */
function withToggle (Class) {
  class WithToggle extends Class {
    toggle (name, value) {
      const s = this
      const byObj = arguments.length === 0 && typeof arguments[0] === 'object'
      if (byObj) {
        for (const [name, value] of Object.entries(arguments[0])) {
          s.toggle(name, value)
        }
        return
      }
      const scope = s.scope[name]
      if (!scope) {
        throw new Error(`Unknown scope: ${name}`)
      }
      scope.toggle(value)
    }

    true (name) {
      const s = this
      s.toggle(name, true)
    }

    false (name) {
      const s = this
      s.toggle(name, false)
    }
  }

  return WithToggle
}

module.exports = withToggle
