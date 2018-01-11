/**
 * AppScene
 * @class AppScene
 */
'use strict'

const {Urls} = require('@self/conf')
const {get} = require('the-window')
const qs = require('qs')

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends AppScene */
const AppScene = cn.compose(
  cn.withBusy,
  cn.withQuery,
  cn.withLocation
)(
  class AppSceneBase extends Scene {
    get scope () {
      return this.store.app
    }

    setLocation ({pathname, search}) {
      this.set({pathname})
      this.setQueryBySearch(search)
    }

    handleRejectionReason (reason) {
      if (!reason) {
        return false
      }
      switch (reason.name) {
        case 'UnauthorizedError': {
          this.changeLocationTo(Urls.SIGNIN_URL)
          return true
        }
        default:
          return false
      }
    }
  }
)

module.exports = AppScene
