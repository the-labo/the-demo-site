/**
 * Helper functions for browser
 */
'use strict'

const e2eUtil = require('the-e2e/util')
const asleep = require('asleep')

function browserAccess (browser) {
  return {
    async waitUntil (expression, result) {
      return e2eUtil.waitUntil(browser, expression, result)
    },

    byAttr (key, value) {
      return e2eUtil.byAttr(browser, key, value)
    },

    async fillForm (form, values) {
      return await e2eUtil.fillForm(browser, form, values)
    }

  }
}

module.exports = browserAccess
