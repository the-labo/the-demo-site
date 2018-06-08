/**
 * Source url set
 * @module SrcSets
 */
'use strict'

const {isProduction} = require('the-check')
const {hashProxy} = require('the-site-util')
const Urls = require('./Urls')

module.exports = Object.freeze(
  /** @lends SrcSets */
  {
    cssSet: [
      Urls.CSS_THEME_URL,
      Urls.CSS_NORMALIZE_URL,
      Urls.CSS_FONT_URL,
      Urls.CSS_FLATPICKR_URL,
    ],
    jsSet: [
      Urls.JS_SHIM_URL,
    ],
  }
)

if (!isProduction()) {
  module.exports = hashProxy(module.exports, {name: 'SrcSets', unknownCheck: true})
}
