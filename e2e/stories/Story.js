/**
 * @class Story
 */
'use strict'

const {resolveUrl} = require('the-site-util')
const {
  TheStory,
  by,
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
    await browser.waitVariableToBe(GlobalExpressions.appStageExpression, 'mounted')

    logger.debug('Open URL', JSON.stringify(url))
  }

  access (context) {
    const {browser, logger} = this
    const $ = browser.$.bind(browser)
    const debug = (m, ...t) => logger.debug(
      `\`${context}\` - ${m}`, t.map((t) => JSON.stringify(t)).join()
    )
    return {
      async setValues (values) {
        debug('Set values:', values)
        for (const [name, value] of Object.entries(values)) {
          const selector = by.name(name)
          await $(context).waitForVisible(selector, 1000)
          await $(context).setValue(selector, value)
        }
      },

      async waitAndClick (selector, {timeout = 5000} = {}) {
        debug('Wait and click selector:', selector)
        await $(context).waitForVisible(selector, timeout)
        await $(context).click(selector)
      },

      async waitAndClickByText (text) {
        return this.waitAndClick(by.text(text))
      },

      async waitAndClickByRole (role) {
        return this.waitAndClick(by.role(role))
      }
    }
  }

  accessByClass (c) {
    return this.access(by.class(c))
  }

  accessByName (name) {
    return this.access(by.name(name))
  }

  accessByData (k, v) {
    return this.access(by.data(k, v))
  }
}

module.exports = Story
