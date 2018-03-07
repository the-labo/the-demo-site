/**
 * @class Story
 */
'use strict'

const {resolveUrl} = require('the-site-util')
const {GlobalExpressions} = require('../constants')
const {locales} = require('../../conf')
const {
  TheStory,
} = require('../../../the-story-base')

/** @lends Story */
class Story extends TheStory {

  constructor (...args) {
    super(...args)

    this.lang = 'en'
    this.l = locales.bind(this.lang)
  }

  async open (url) {
    const {browser} = this
    await browser.url(resolveUrl(url, {}, {locale: this.lang}))
    await browser.waitVariableToBe(GlobalExpressions.appStageExpression, 'mounted')
  }
}

module.exports = Story
