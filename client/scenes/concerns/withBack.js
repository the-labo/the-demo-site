/**
 * withBack mixin
 * @function withBack
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const {Urls} = require('@self/conf')

/** @lends withBack */
function withBack (Class) {
  class WithBack extends Class {
    goBack () {
      const s = this
      const {back} = s.scope
      const url = back.state || Urls.TOP_URL
      s.goTo(url)
    }
  }

  return WithBack
}

module.exports = withBack
