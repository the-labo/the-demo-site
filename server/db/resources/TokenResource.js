/**
 * @class TokenResource
 * @augments Resource
 */
'use strict'

const { TheTokenResource } = require('the-site-resources')

/** @lends TokenResource */
class TokenResource extends TheTokenResource {
  forUserMediaUpload (userId) {
    return this.of({ key: `media-upload-user#${userId}` })
  }
}

module.exports = TokenResource
