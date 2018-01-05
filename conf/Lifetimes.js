/**
 * Life time durations
 * @enum {number} Lifetimes
 */
'use strict'

const {hours} = require('the-date')

module.exports = Object.freeze(
  /** @lends Lifetimes */
  {
    VERIFY_EMAIL_LIFETIME: hours(48),
    RECOVER_EMAIL_LIFETIME: hours(48)
  }
)

