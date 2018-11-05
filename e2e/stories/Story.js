/**
 * @class Story
 */
'use strict'

const asleep = require('asleep')
const { resolveUrl } = require('the-site-util')
const {
  TheStory,
} = require('the-story-base')
const { GlobalExpressions } = require('../constants')
const { UI, locales } = require('../../conf')

/** @lends Story */
class Story extends TheStory {
  constructor (...args) {
    super(...args)
    this.lang = UI.DEFAULT_LANG
    this.l = locales.bind(this.lang)
  }

  async open (url) {
    const { browser, logger } = this
    const query = { locale: this.lang }
    await browser.url(resolveUrl(url, {}, { query }))
    await this.ready()
    logger.debug('Open URL', JSON.stringify(url))
  }

  async phase (...args) {
    const result = await super.phase(...args)
    await this.ready()
    return result
  }

  async ready () {
    await this.sleep(100)
    const { browser } = this
    await browser.waitVariableToBe(GlobalExpressions.appStageExpression, 'mounted', 10000)
    await browser.waitForNotVisible('.the-toast', 5000)

    const $main = await this.accessByRole('main')
    await $main.waitUntilReady()
  }

  async status (values) {
    const { browser } = this
    return {
      title: await browser.getTitle(),
      ...values,
    }
  }
}

module.exports = Story
