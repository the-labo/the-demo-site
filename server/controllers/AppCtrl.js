/**
 * Application controller
 * @class AppCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')

/** @lends AppCtrl */
class AppCtrl extends Ctrl {

  async getPreference (name) {
    const {preferences = {}} = this.session
    return preferences[name]
  }

  async setPreference (name, value) {
    const {preferences = {}} = this.session
    this.session.preferences = Object.assign({}, preferences, {[name]: value})
  }
}

module.exports = AppCtrl
