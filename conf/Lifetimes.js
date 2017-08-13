/**
 * Life time durations
 * @name Lifetimes
 */
'use strict'

const {hours} = require('the-date')

exports.VERIFY_EMAIL_LIFETIME = hours(48)
exports.RECOVER_EMAIL_LIFETIME = hours(48)

