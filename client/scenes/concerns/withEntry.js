/**
 * withEntry mixin
 * @function withEntry
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const {expand} = require('objnest')

/** @lends withEntry */
function withEntry (Class) {
  class EntryMixed extends Class {
    dropEntryValues () {
      const s = this
      s.scope.values.drop()
    }

    setEntryValues (values) {
      const s = this
      s.scope.values.set(values)

      {
        const names = Object.keys(values).filter((name) => s.scope.errors.state[name])
        if (names.length > 0) {
          s.scope.errors.del(...names)
        }
      }
    }

    setEntryErrors (errors) {
      const s = this
      s.scope.errors.set(errors)
    }

    async processEntry (handler) {
      const s = this
      const values = expand(s.scope.values.state)
      return Promise.resolve(handler(values)).catch((e) =>
        s.setEntryErrors(s.catchEntryError(e))
      )
    }
  }

  return EntryMixed
}

module.exports = withEntry
