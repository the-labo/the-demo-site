'use strict'

const asleep = require('asleep')
const by = require('the-story-base/lib/by')
const c = require('./concerns')
const Story = require('./Story')
const {Urls} = require('../../conf')

const SignInOutStoryBase = c.compose(
  c.signOperative
)(Story)

class SignInOutStory extends SignInOutStoryBase {

  async run () {
    const {browser, l} = this
    await this.phase('Sign In', async ({ok}) => {
      await this.operateSignIn('demo2', 'demo2')
      ok(true)
    })

    await this.phase('Sign Out', async ({ok}) => {
      await this.operateSignOut()
    })
  }
}

module.exports = SignInOutStory

if (!module.parent) {
  require('../singleton').telStory(module.exports)
}
