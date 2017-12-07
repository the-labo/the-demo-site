/**
 * withSort mixin
 * @function withSort
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const normalizeSort = (key) => key.replace(/^-/, '')

/** @lends withSort */
function withSort (Class) {
  class WithSort extends Class {
    setSort (name) {
      const s = this
      const [current] = [].concat(s.get('sort') || [])
      if (normalizeSort(current) === normalizeSort(name)) {
        name = /^-/.test(current) ? normalizeSort(current) : `-${current}`
      }
      s.set({sort: [name]})
    }
  }

  return WithSort
}

module.exports = withSort
