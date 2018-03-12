/**
 * @class Story
 */
'use strict'

const {resolveUrl} = require('the-site-util')
const {
  TheStory,
} = require('the-story-base')
const {GlobalExpressions} = require('../constants')
const {locales} = require('../../conf')

/** @lends Story */
class Story extends TheStory {

  constructor (...args) {
    super(...args)
    this.lang = 'en'
    this.l = locales.bind(this.lang)
  }

  async open (url) {
    const {browser, logger} = this
    await browser.url(resolveUrl(url, {}, {locale: this.lang}))
    await this.ready()
    logger.debug('Open URL', JSON.stringify(url))
  }

  async phase (...args) {
    const result = await super.phase(...args)
    await this.ready()
    return result
  }

  async ready () {
    const {browser} = this
    await browser.waitVariableToBe(GlobalExpressions.appStageExpression, 'mounted', 5000)
    await browser.waitForNotVisible('.the-toast', 5000)

    const $main = await this.accessByRole('main')
    await $main.waitUntilReady()
  }

  async status (values) {
    const {browser} = this
    return {
      title: await browser.getTitle(),
      ...values,
    }
  }
}

module.exports = Story
