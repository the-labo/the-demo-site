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
      const {entry} = s.scope
      entry.values.drop()
    }

    setEntryValues (values) {
      const s = this
      const {entry} = s.scope
      entry.values.setValues(values)

      {
        const names = Object.keys(values).filter((name) => s.errors.state[name])
        if (names.length > 0) {
          entry.errors.del(...names)
        }
      }
    }

    async processEntry (handler) {
      const s = this
      const {entry} = s.scope
      const values = expand(entry.values.state)
      return Promise.resolve(handler(values)).catch((e) =>
        entry.setErrors(s.catchEntryError(e))
      )
    }
  }

  return EntryMixed
}

module.exports = withEntry
