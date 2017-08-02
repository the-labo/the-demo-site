/**
 * @function errorMix
 * @param {function} BaseClass
 * @returns {function} MixedClass
 */
'use strict'

/** @lends errorMix */
function errorMix (BaseClass) {
  class ErrorMixed extends BaseClass {
    catchEntryError (err) {
      const s = this
      switch (err.name) {
        case 'PolicyError': {
          return s.parsePolicyError(err)
        }
        default:
          throw err
      }
    }

    parsePolicyError (err) {
      const s = this
      const { l } = s
      let {
        conflict = {},
        failures = {},
        missing = []
      } = err.detail
      let messages = {}
      for (let name of Object.keys(failures)) {
        let failure = failures[ name ]
        messages[ name ] = l('errors', failure.reason, failure)
      }
      for (let name of Object.keys(conflict)) {
        messages[ name ] = l('errors', 'UNIQUE_VIOLATION_ERROR', { value: conflict[ name ] })
      }
      for (let name of missing) {
        messages[ name ] = l('errors', 'VALUE_MISSING_ERROR')
      }
      return messages
    }
  }

  return ErrorMixed
}

module.exports = errorMix
