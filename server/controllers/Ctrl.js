/**
 * @abstract
 * @class Ctrl
 */
const {TheCtrl,} = require('the-controller-base')
const {compose, withClient, withDebug, withSeal,} = require('the-controller-mixins')
const {withAuth,} = require('./concerns')

const CtrBase = compose(
  withClient,
  withSeal,
  withAuth,
  withDebug,
)(TheCtrl)

/** @lends Ctrl */
class Ctrl extends CtrBase {
  get lang () {
    return this.client.lang
  }

  get mail () {
    return this.app.mail
  }

  get resources () {
    return this.app.db.resources
  }

  get services () {
    return this.app.services
  }

  async controllerMethodWillInvoke (invocation) {
    await super.controllerMethodWillInvoke(invocation)
    await this.syncUser()
  }

  async syncUser () {
    this.user = (await this._fetchAuthorizedUser()) || null
  }
}

module.exports = Ctrl
