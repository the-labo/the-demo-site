/**
 * Life time durations
 * @enum {number} Lifetimes
 */
'use strict'

const {Durations: {ONE_HOUR}} = require('the-date')

module.exports = Object.freeze(
  /** @lends Lifetimes */
  {
    RECOVER_EMAIL_LIFETIME: ONE_HOUR * 48,
    VERIFY_EMAIL_LIFETIME: ONE_HOUR * 48,
  }
)
