/**
 * Resource for URL alias
 */
'use strict'

const {Urls} = require('@self/conf')
const {TheAliasResource} = require('the-site-resources')

class AliasResource extends TheAliasResource {
  get pathnameFormat () {
    return Urls.ALIAS_URL
  }
}

module.exports = AliasResource
