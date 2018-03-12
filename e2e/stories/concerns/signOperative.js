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

    async operateSignDel () {
      const {l} = this
      await this.open(Urls.ACCOUNT_QUIT_URL)
      {
        const $view = await this.accessByClass('the-view')
        await $view.waitAndClickByText(l('buttons.SHOW_QUIT_CONFIRM'))
        await this.sleep(300)
        await $view.waitAndClickByText(l('buttons.DO_QUIT'))
        await this.sleep(300)
        await $view.waitAndClickByText(l('buttons.SHOW_TOP_AGAIN'))
      }
    }

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

      {
        const $Header = await this.accessByClass('the-header')
        await $Header.waitAndClickByRole('menu')
        await $Header.waitAndClickByText(l('buttons.DO_SIGN_OUT'))
      }
      await this.ready()

      return await this.status({})
    }

    async operateSignUp (email, name, password) {
      const {l} = this
      await this.open(Urls.SIGN_UP_URL)
      {
        const $Form = await this.accessByName('SignUpForm')
        await $Form.setValues({'profile.email': email})
        await $Form.waitAndClickByText(l('buttons.SHOW_NEXT'))
        await this.sleep(200)
        await $Form.setValues({name, password})
        await $Form.waitAndClickByText(l('buttons.DO_SIGN_UP'))
      }
      await this.ready()
      return await this.status({})
    }
  }

  return SignOperative
}

module.exports = signOperative
