/**
 * @abstract
 * @class Ctrl
 */
const {TheCtrl, withClient, withSeal, compose} = require('the-controller-base')

const CtrBase = compose(
  withClient,
  withSeal
)(TheCtrl)

/** @lends Ctrl */
class Ctrl extends CtrBase {
  get resources () {
    const s = this
    return s.app.db.resources
  }

  get lang () {
    const s = this
    return s.client.lang
  }

  get mail () {
    const s = this
    return s.app.mail
  }

  async _aliasUrlFor (pathname, query = {}) {
    const s = this
    const {protocol, host} = s.client
    const {Alias} = s.resources
    const alias = await Alias.ofUrl(
      s.clientUrlFor(pathname, query)
    )
    return alias.urlFor({protocol, host})
  }

}

module.exports = Ctrl