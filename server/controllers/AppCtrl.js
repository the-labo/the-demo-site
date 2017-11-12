/**
 * Application controller
 * @class AppCtrl
 */
'use strict'

const {TheCtrl} = require('the-controller-base')

/** @lends AppCtrl */
class AppCtrl extends TheCtrl {

  async getPreference (name) {
    const s = this
    const {preferences = {}} = s.session
    return preferences[name]
  }

  async setPreference (name, value) {
    const s = this
    const {preferences = {}} = s.session
    s.session.preferences = Object.assign({}, preferences, {[name]: value})
  }
}

module.exports = AppCtrl
