/**
 * @function goMix
 * @param {function} BaseClass
 * @returns {function} MixedClass
 */
'use strict'

const { get } = require('bwindow')

/** @lends goMix */
function goMix (BaseClass) {
  class GoMixed extends BaseClass {
    goTo (href) {
      const s = this
      const { history } = s
      if (history) {
        history.push(href)
        return
      }
      const location = get('location')
      if (location) {
        location.href = href
        return
      }
      console.warn(`Failed to got to ${href}`)
    }

    goToTop () {
      const s = this
      s.goTo('/')
    }
  }

  return GoMixed
}

module.exports = goMix
