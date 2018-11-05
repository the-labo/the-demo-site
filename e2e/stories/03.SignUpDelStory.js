'use strict'

const c = require('./concerns')
const Story = require('./Story')
const { Urls } = require('../../conf')

const SignUpDelStoryBase = c.compose(
  c.signOperative,
  c.accountOperative,
)(Story)

class SignUpDelStory extends SignUpDelStoryBase {
  async run () {
    const email = 'e2e-new@example.com'
    const name = email.split('@')[0]
    const password = email.split('@')[0] + '-pass'

    await this.phase('Sign Up', async ({ ok }) => {
      await this.operateSignUp(email, name, password)
      ok(true)
    })

    await this.phase('Sign Out', async ({ ok }) => {
      await this.operateSignOut()
    })

    await this.phase('Sign In', async ({ ok }) => {
      await this.operateSignIn(name, password)
      ok(true)
    })

    await this.phase('Sign del', async () => {
      await this.operateSignDel()
    })
  }
}

module.exports = SignUpDelStory

if (!module.parent) {
  require('../singleton').telStory(module.exports)
}
