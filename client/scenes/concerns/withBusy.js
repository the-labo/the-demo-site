/**
 * withBusy mixin
 * @function withBusy
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

/** @lends withBusy */
function withBusy (Class) {
  class WithBusy extends Class {
    async busyFor (task) {
      const s = this
      const {busy} = s.scope
      busy.true()
      try {
        return task()
      } finally {
        busy.false()
      }
    }
  }

  return WithBusy
}

module.exports = withBusy
