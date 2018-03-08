/**
 * accountOperative Mixin
 * @function accountOperative
 * @function {function} Class - Base class
 * @return {function} Mixed class
 */
'use strict'

const by = require('the-story-base/lib/by')
const {Urls} = require('../../../conf')

/** @lends accountOperative */
function accountOperative (Class) {
  /** @lends AccountOperative */
  class AccountOperative extends Class {

    async operateShowAccountPage () {
      await this.open(Urls.TOP_URL)
      const {browser, l} = this

      const $Header = this.accessByClass('the-header')
      await $Header.waitAndClickByRole('menu')
      await $Header.waitAndClickByText(l('buttons.SHOW_MYPAGE'))

      return {
        title: await browser.getTitle(),
      }
    }

    async operateChangeAccountPassword (password) {
      await this.open(Urls.ACCOUNT_MYPAGE_URL)
      const {browser, l} = this

      const $view = this.accessByData('stateful-bind', 'MypageView')
      await $view.waitAndClickByText(l('buttons.SHOW_PASSWORD_EDIT'))

      const $form = this.accessByName('SignUpForm')
      $form.setValues({password})

      return {
        title: await browser.getTitle(),
      }
    }

  }

  return AccountOperative
}

module.exports = accountOperative
