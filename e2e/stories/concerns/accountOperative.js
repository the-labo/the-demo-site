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

    async operateAccountMypage () {
      await this.open(Urls.TOP_URL)
      const {browser, l} = this

      const $Header = await this.accessByClass('the-header')
      await $Header.waitAndClickByRole('menu')
      await $Header.waitAndClickByText(l('buttons.SHOW_MYPAGE'))

      return await this.status({})
    }


  }

  return AccountOperative
}

module.exports = accountOperative
