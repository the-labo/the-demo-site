/**
 * profileOperative Mixin
 * @function profileOperative
 * @function {function} Class - Base class
 * @return {function} Mixed class
 */
'use strict'

const {Urls} = require('../../../conf')

/** @lends profileOperative */
function profileOperative (Class) {
  /** @lends ProfileOperative */
  class ProfileOperative extends Class {

    async operateProfileChange (profileName, email) {
      await this.open(Urls.ACCOUNT_PROFILE_URL)
      {
        const $form = await this.accessByName('ProfileEditForm')
        await $form.setValues({
          'email': email,
          'name': profileName,
        })
        await $form.waitAndClickByClass('the-button-primary')
      }
      {
        const $done = await this.accessByClass('the-done')
        await $done.waitAndClickByClass('the-done-link')
      }
    }

  }

  return ProfileOperative
}

module.exports = profileOperative
