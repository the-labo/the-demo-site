/**
 * AppScene
 * @class AppScene
 */
'use strict'

const {Urls,} = require('@self/conf')
const {bindScope, withBusy, withHistory, withLocation, withQuery,} = require('the-scene-mixins/shim')
const Scene = require('./Scene')

@withBusy
@withQuery
@withHistory
@withLocation
@bindScope('app')
class AppSceneBase extends Scene {}

/** @lends AppScene */
class AppScene extends AppSceneBase {

  applyLocaleToSearch () {
    const locale = this.get('locale')
    this.mergeQueryToSearch({locale,})
  }

  handleRejectionReason (reason) {
    if (!reason) {
      return false
    }
    switch (reason.name) {
      case 'UnauthorizedError': {
        this.changeLocationTo(Urls.SIGN_IN_URL)
        return true
      }
      case 'NotFoundError': {
        this.changeLocationTo(Urls.ERROR_NOTFOUND_URL)
        return true
      }
      case 'ForbiddenError': {
        this.changeLocationTo(Urls.ERROR_FORBIDDEN_URL)
        return true
      }
      default:
        return false
    }
  }

  setLocation ({pathname, search,}) {
    this.set({pathname,})
    this.setQueryBySearch(search)
    this.applyLocaleToSearch()
  }

  @withBusy.while
  async doReload () {
    await this.reloadLocation()
  }
}

module.exports = AppScene
