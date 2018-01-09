/**
 * Wrap controller
 * @function withAlias
 */
'use strict'

/** @lends withAlias */
function withAlias (Class) {
  class WithAlias extends Class {
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

  return WithAlias
}

module.exports = withAlias