/**
 * Application controller
 * @class AppCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')

/** @lends AppCtrl */
class AppCtrl extends Ctrl {

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
