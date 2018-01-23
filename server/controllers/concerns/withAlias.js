/**
 * Wrap controller
 * @function withAlias
 */
'use strict'

/** @lends withAlias */
function withAlias (Class) {
  class WithAlias extends Class {
    async _aliasUrlFor (pathname, query = {}) {
      const {
        client: {protocol, host},
        resources: {Alias},
      } = this
      const alias = await Alias.ofUrl(
        await this.clientUrlFor(pathname, query)
      )
      return alias.urlFor({protocol, host})
    }
  }

  return WithAlias
}

module.exports = withAlias