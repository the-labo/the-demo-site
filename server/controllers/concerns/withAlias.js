/**
 * Wrap controller
 * @function withAlias
 */
'use strict'

/** @lends withAlias */
function withAlias (Class) {
  class WithAlias extends Class {
    async _aliasUrlFor (pathname, query = {}) {

      const {protocol, host} = this.client
      const {Alias} = this.resources
      const alias = await Alias.ofUrl(
        this.clientUrlFor(pathname, query)
      )
      return alias.urlFor({protocol, host})
    }
  }

  return WithAlias
}

module.exports = withAlias