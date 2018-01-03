/**
 * AppScene
 * @class AppScene
 */
'use strict'

const {Urls} = require('@self/conf')
const {get} = require('the-window')

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends AppScene */
const AppScene = cn.compose(
  cn.withBusy
)(
  class AppSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.app
    }

    handleRejectionReason (reason) {
      if (!reason) {
        return false
      }
      switch (reason.name) {
        case 'UnauthorizedError': {
          const location = get('location')
          location.href = Urls.SIGNIN_URL
          return true
        }
        default:
          return false
      }
    }
  }
)

module.exports = AppScene
