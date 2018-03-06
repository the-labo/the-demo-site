/**
 * @class Story
 */
'use strict'

const {resolveUrl} = require('the-site-util')
const {
  Finder,
  TheStory,
} = require('the-story-base')
const {GlobalExpressions} = require('../constants')
const {
  asForm,
  asGlobalHeader,
} = require('../helpers/elementHelper')
const {locales} = require('../../conf')

/** @lends Story */
class Story extends TheStory {

  constructor (...args) {
    super(...args)

    this.lang = 'en'
    this.l = locales.bind(this.lang)
  }

  GlobalHeader () {
    const header = Finder.Stateful('Header').apply(this.browser)
    return asGlobalHeader(header)
  }

  StatefulForm (name) {
    const form = Finder.Stateful(name).apply(this.browser)
    return asForm(form)
  }

  async open (url) {
    const {browser} = this
    await browser.url(resolveUrl(url, {}, {locale: this.lang}))
    await this.waitToBe(GlobalExpressions.appStageExpression, 'mounted')
  }
}

module.exports = Story
