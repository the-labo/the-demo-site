/**
 * @abstract
 * @class Ctrl
 */
const {TheCtrl, mixins: {withClient, withSeal, compose}} = require('the-controller-base')

const CtrBase = compose(
  withClient,
  withSeal
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
}

module.exports = Ctrl