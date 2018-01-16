/**
 * AppScene
 * @class AppScene
 */
'use strict'

const {Urls} = require('@self/conf')
const Scene = require('./Scene')
const {bindScope, withBusy, withQuery, withLocation} = require('the-scene-mixins/shim')

@withBusy
@withQuery
@withLocation
@bindScope('app')
class AppSceneBase extends Scene {}

/** @lends AppScene */
class AppScene extends AppSceneBase {

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

module.exports = AppScene
