/**
 * Resource for URL alias
 */
'use strict'

const {TheAliasResource} = require('the-site-resources')
const {Urls} = require('@self/conf')

class AliasResource extends TheAliasResource {
  get pathnameFormat () {
    return Urls.ALIAS_URL
  }
}

module.exports = AliasResource
