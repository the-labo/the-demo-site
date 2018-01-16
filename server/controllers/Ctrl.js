/**
 * @abstract
 * @class Ctrl
 */
const {TheCtrl} = require('the-controller-base')
const {withClient, withDebug, withSeal, compose} = require('the-controller-mixins')
const {withAuth,} = require('./concerns')

const CtrBase = compose(
  withClient,
  withSeal,
  withAuth,
  withDebug,
)(TheCtrl)

/** @lends Ctrl */
class Ctrl extends CtrBase {
  get resources () {
    return this.app.db.resources
  }

  get lang () {
    return this.client.lang
  }

  get mail () {
    return this.app.mail
  }

  get services () {
    return this.app.services
  }

  async controllerMethodWillInvoke () {
    this.user = (await this._fetchAuthorizedUser()) || null
  }
}

module.exports = Ctrl