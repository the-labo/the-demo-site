/**
 * @abstract
 * @class Ctrl
 */
const {TheCtrl, withClient, compose} = require('the-controller-base')
const {Urls} = require('@self/conf')

const CtrBase = compose(
  withClient
)(TheCtrl)

/** @lends Ctrl */
class Ctrl extends CtrBase {
  get resources () {
    const s = this
    return s.app.db.resources
  }

  async aliasUrlFor (pathname, query = {}) {
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