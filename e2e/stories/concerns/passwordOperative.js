/**
 * passwordOperative Mixin
 * @function passwordOperative
 * @function {function} Class - Base class
 * @return {function} Mixed class
 */
'use strict'

const { Urls } = require('../../../conf')

/** @lends passwordOperative */
function passwordOperative (Class) {
  /** @lends PasswordOperative */
  class PasswordOperative extends Class {
    async operatePasswordChange (password) {
      await this.open(Urls.ACCOUNT_PASSWORD_URL)
      const { l } = this

      {
        const $form = await this.accessByName('PasswordChangeForm')
        await $form.setValues({ password })
        await $form.waitAndClickByClass('the-button-primary')
      }

      {
        const $done = await this.accessByClass('the-done')
        await $done.waitAndClickByClass('the-done-link')
      }

      {
        const $form = await this.accessByName('PasswordChangeForm')
        await $form.setValues({ password })
        await $form.waitAndClickByClass('the-button-primary')
      }

      return await this.status({})
    }
  }

  return PasswordOperative
}

module.exports = passwordOperative
