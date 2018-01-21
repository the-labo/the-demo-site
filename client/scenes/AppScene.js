/**
 * AppScene
 * @class AppScene
 */
'use strict'

const {Urls} = require('@self/conf')
const Scene = require('./Scene')
const {bindScope, withBusy, withQuery, withLocation, withHistory,} = require('the-scene-mixins/shim')
const {appendQueryToSearch} = require('the-site-util')

@withBusy
@withQuery
@withHistory
@withLocation
@bindScope('app')
class AppSceneBase extends Scene {}

/** @lends AppScene */
class AppScene extends AppSceneBase {

  setLocation ({pathname, search}) {
    this.set({pathname})
    this.setQueryBySearch(search)
    this.applyLocaleToSearch()
  }

  applyLocaleToSearch () {
    const locale = this.get('locale')
    appendQueryToSearch({locale})
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
