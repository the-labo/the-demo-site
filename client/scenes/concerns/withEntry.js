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
    dropEntry () {
      const s = this
      const {entry, entryErrors} = s.scope
      entry.drop()
      entryErrors.drop()
    }

    setEntry (values) {
      const s = this
      const {entry, entryErrors} = s.scope
      entry.set(values)

      {
        const names = Object.keys(values)
          .filter((name) => entryErrors.state[name])
        if (names.length > 0) {
          entryErrors.del(...names)
        }
      }
    }

    async processEntry (handler) {
      const s = this
      const {entry, entryErrors} = s.scope
      entryErrors.drop()
      const values = expand(entry.state)
      return Promise.resolve(handler(values)).catch((e) =>
        entryErrors.set(s.catchEntryError(e))
      )
    }
  }

  return EntryMixed
}

module.exports = withEntry
