/**
 * Mixin for resource with code
 * @function withCode
 */
'use strict'

function withCode (Class) {
  class WithCode extends Class {
    async ofCode (code) {
      const Resource = this
      return Resource.only({code})
    }
  }

  return WithCode
}

module.exports = withCode
