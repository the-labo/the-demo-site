#!/usr/bin/env node

'use strict'

const asleep = require('asleep')
const Story = require('./Story')
const {Urls} = require('../../conf')

class SignInStory extends Story {

  async run () {
    await this.open(Urls.SIGN_IN_URL)

    {
      await asleep(10)

      const SignInForm = this.detect.Stateful('SignInForm')
      await this.fillForm(SignInForm, {
        name: 'demo',
        password: 'demo',
      })

      await this.submitForm(SignInForm)

      await asleep(1)
      await this.saveScreenshot('sign-in-done.png')
    }
  }
}

module.exports = SignInStory

if (!module.parent) {
  require('../singleton').telStory(module.exports)
}
