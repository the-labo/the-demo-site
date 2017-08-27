/**
 * Mixin for user related resource
 * @function withUser
 */
'use strict'

function withUser (Class) {
  class WithUser extends Class {
    async ofUser (user) {
      const Resource = this
      const entity = await Resource.first({user})
      if (entity) {
        return entity
      }
      await Resource.create({user})
      return Resource.only({user})
    }
  }

  return WithUser
}

module.exports = withUser
