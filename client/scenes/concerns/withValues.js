/**
 * withValues mixin
 * @function withValues
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

/** @lends withValues */
function withValues (Class) {
  class WithValues extends Class {
    setValues (v) {
      const s = this
      s.scope.values.set(v)
    }

    dropValues () {
      const s = this
      s.scope.values.drop()
    }
  }

  return WithValues
}

module.exports = withValues
