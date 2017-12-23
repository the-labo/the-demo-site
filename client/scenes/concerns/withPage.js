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
    get defaultPageSize () {
      return 25
    }

    getPage () {
      const s = this
      return {
        number: s.get('pageNumber') || 1,
        size: s.get('pageSize')
      }
    }
  }

  return WithPage
}

module.exports = withPage
