/**
 * Application controller
 * @class AppCtrl
 */
'use strict'

const {compose, withPreference,} = require('the-controller-mixins')
const Ctrl = require('./Ctrl')

const AppCtrlBase = compose(
  withPreference
)(Ctrl)

/** @lends AppCtrl */
class AppCtrl extends AppCtrlBase {
  async get (name) {
    await this._getSessionPreference(name)
  }

  async set (name, value) {
    await this._setSessionPreference(name, value)
  }

}

module.exports = AppCtrl
