'use strict'

const Story = require('./Story')
const {Urls} = require('../../conf')
const by = require('../../../the-story-base/lib/by')
const asleep = require('asleep')

class SignInOutStory extends Story {

  async run () {
    const {browser, l} = this
    const $ = browser.$.bind(browser)
    await this.open(Urls.SIGN_IN_URL)
    await this.phase('In', async ({ok}) => {

      const Form = by.name('SignInForm')
      await $(Form).setValue(by.name('name'), 'demo')
      await $(Form).setValue(by.name('password'), 'demo')
      await $(Form).click(by.text(l('buttons.DO_SIGN_IN')))

      ok(true)
    })

    await this.phase('Out', async ({ok}) => {

      const Header = by.class('the-header')

      await $(Header).click(by.role('menu'))

      const SignoutButton = by.text(l('buttons.DO_SIGN_OUT'))

      await $(Header).waitForVisible(SignoutButton, 800)
      await $(Header).click(SignoutButton)

      await asleep(5000)
    })
  }
}

module.exports = SignInOutStory

if (!module.parent) {
  require('../singleton').telStory(module.exports)
}
