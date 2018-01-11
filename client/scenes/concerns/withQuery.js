/**
 * withQuery mixin
 * @function withQuery
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const qs = require('qs')

/** @lends withQuery */
function withQuery (Class) {
  class WithQuery extends Class {
    setQueryBySearch (search) {
      this.set({query: qs.parse(search, {ignoreQueryPrefix: true})})
    }
  }

  return WithQuery
}

module.exports = withQuery
