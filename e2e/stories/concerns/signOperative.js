/**
 * Operation set for sign
 * @function signOperative
 * @function {function} Class - Base class
 * @return {function} Mixed class
 */
'use strict'

const {Urls} = require('../../../conf')

/** @lends signOperative */
function signOperative (Class) {
  class SignOperative extends Class {
    async operateSignIn (name, password) {
      const {l} = this
      await this.open(Urls.SIGN_IN_URL)
      {
        const $Form = await this.accessByName('SignInForm')
        await $Form.setValues({name, password})
        await $Form.waitAndClickByText(l('buttons.DO_SIGN_IN'))
      }
      await this.ready()

      return await this.status({})
    }

    async operateSignOut () {
      const {l} = this
      const $Header = await this.accessByClass('the-header')
      await $Header.waitAndClickByRole('menu')
      await $Header.waitAndClickByText(l('buttons.DO_SIGN_OUT'))
      await this.ready()

      return await this.status({})
    }
  }

  return SignOperative
}

module.exports = signOperative
