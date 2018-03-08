/**
 * Operation set for sign
 * @function signOperative
 * @function {function} Class - Base class
 * @return {function} Mixed class
 */
'use strict'

const by = require('the-story-base/lib/by')
const {Urls} = require('../../../conf')

/** @lends signOperative */
function signOperative (Class) {
  class SignOperative extends Class {
    async operateSignIn (name, password) {
      const {l} = this
      await this.open(Urls.SIGN_IN_URL)
      {
        const $Form = this.accessByName('SignInForm')
        await $Form.setValues({name, password})
        await $Form.waitAndClickByText(l('buttons.DO_SIGN_IN'))
      }
    }

    async operateSignOut () {
      const {l} = this
      const $Header = this.accessByClass('the-header')
      await $Header.waitAndClickByRole('menu')
      await $Header.waitAndClickByText(l('buttons.DO_SIGN_OUT'))
    }
  }

  return SignOperative
}

module.exports = signOperative
