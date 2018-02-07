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
        client: {host, protocol},
        resources: {Alias},
      } = this
      const alias = await Alias.ofUrl(
        await this.clientUrlFor(pathname, query)
      )
      return alias.urlFor({host, protocol})
    }
  }

  return WithAlias
}

module.exports = withAlias
