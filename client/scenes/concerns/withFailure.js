/**
 * withFailure mixin
 * @function withFailure
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

/** @lends withFailure */
function withFailure (Class) {
  class WithFailure extends Class {
    setFailure (failure) {
      const s = this
      s.scope.failure.set(failure)
    }

    clearFailure () {
      const s = this
      s.scope.failure.del()
    }

    async catchFailure (e, options = {}) {
      const s = this
      const {messages = {}} = options
      const message = messages[e.name] || messages.default
      if (message) {
        s.setFailure(message)
      } else {
        return Promise.reject(e)
      }
    }
  }

  return WithFailure
}

module.exports = withFailure
