'use strict'

const c = require('./concerns')
const Story = require('./Story')
const { Urls } = require('../../conf')

const SignInOutStoryBase = c.compose(
  c.signOperative
)(Story)

class SignInOutStory extends SignInOutStoryBase {
  async run () {
    const name = 'e2e'
    const password = 'e2e'

    await this.phase('Sign In', async ({ ok }) => {
      await this.operateSignIn(name, password)
      ok(true)
    })

    await this.phase('Sign Out', async ({ ok }) => {
      await this.operateSignOut()
    })
  }
}

module.exports = SignInOutStory

if (!module.parent) {
  require('../singleton').telStory(module.exports)
}
