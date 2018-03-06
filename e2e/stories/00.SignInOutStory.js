'use strict'

const asleep = require('asleep')
const Story = require('./Story')
const {Urls} = require('../../conf')

class SignInOutStory extends Story {

  async run () {

    await this.open(Urls.SIGN_IN_URL)

    await this.phase('In', async () => {

      const SignInForm = this.StatefulForm('SignInForm')
      await SignInForm.fill({
        name: 'demo',
        password: 'demo',
      })
      await SignInForm.submit()
    })

    await this.phase('Out', async () => {
      await this.open(Urls.SIGN_OUT_URL)
    })
  }
}

module.exports = SignInOutStory

if (!module.parent) {
  require('../singleton').telStory(module.exports)
}
