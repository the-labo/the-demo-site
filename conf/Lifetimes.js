/**
 * Life time durations
 * @enum {number} Lifetimes
 */
'use strict'

const {units: {hours}} = require('the-date')

module.exports = Object.freeze(
  /** @lends Lifetimes */
  {
    RECOVER_EMAIL_LIFETIME: hours(48),
    VERIFY_EMAIL_LIFETIME: hours(48),
  }
)
