/**
 * @abstract
 * @class MasterCtrl
 */
'use strict'

const {TheCtrl} = require('the-controller-base')
const {withDebug, withAuthorized, withAdmin} = require('../concerns')

class MasterCtrl extends TheCtrl {
  async onlyAdmin () {
    const s = this
    await s._assertAuthorized()
    await s._assertAsAdmin()
  }
}

module.exports = withAuthorized(
  withAdmin(MasterCtrl)
)