/**
 * @class Story
 */
'use strict'

const amkdirp = require('amkdirp')
const path = require('path')
const {
  Detector: E2EDetector,
  Story: E2EStory,
  util: e2eUtil,
} = require('the-e2e')
const {E2EConfig, GlobalExpressions} = require('../constants')

class Detector extends E2EDetector {
}

/** @lends Story */
class Story extends E2EStory {
  constructor (...args) {
    super(...args)
    this.detect = new Detector(this.browser)
  }

  async fillForm (form, values) {
    for (const [name, val] of Object.entries(values)) {
      const input = this.detect.byNameAttr(name)
      await input.setValue(val)
    }
  }

  async open (url) {
    const {browser} = this
    await browser.url(url)
    const isLocalPath = /^\//.test(url)
    if (isLocalPath) {
      await this.waitUntil(GlobalExpressions.appStageExpression, 'mounted')
    }
  }

  async submitForm (form) {
    await new Detector(form).byRole('form-submit').click()
  }

  async waitUntil (expression, result) {
    const {browser} = this
    return e2eUtil.waitUntil(browser, expression, result)
  }
}

module.exports = Story
