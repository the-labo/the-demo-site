/**
 * withPage mixin
 * @function withPage
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

/** @lends withPage */
function withPage (Class) {
  class WithPage extends Class {
    get defaultPageNumber () {
      return 1
    }

    get defaultPageSize () {
      return 25
    }

    getPage () {
      const s = this
      return {
        number: s.get('pageNumber') || s.defaultPageNumber,
        size: s.get('pageSize') || s.defaultPageSize
      }
    }
  }

  return WithPage
}

module.exports = withPage
