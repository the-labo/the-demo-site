/**
 * Resource for URL alias
 */
'use strict'

const {Resource, DataTypes} = require('the-db')
const {STRING} = DataTypes
const uuid = require('uuid')
const numeral = require('numeral')
const {Urls} = require('@self/conf')
const {resolveUrl} = require('the-site-util')

class AliasResource extends Resource {
  async generateKey () {
    const Alias = this
    const num = (await Alias.count()) + 1
    return uuid.v4().split('-').pop() + numeral(num).format('000')
  }

  async ofUrl (originalUrl) {
    const Alias = this
    const found = await Alias.first({originalUrl})
    if (found) {
      return found
    }
    const key = await Alias.generateKey()
    return Alias.create({
      originalUrl,
      key,
      shortUrl: resolveUrl(Urls.ALIAS_URL, {key})
    })
  }

  static get policy () {
    return {
      key: {
        type: STRING,
        required: true,
        unique: true,
        description: 'Alias key'
      },
      originalUrl: {
        type: STRING,
        required: true,
        unique: true,
        description: 'Original path of alias'
      },
      shortUrl: {
        type: STRING,
        required: true,
        unique: true,
        description: 'Shortened url'
      }
    }
  }

  static entityClass (ResourceEntity) {
    /** @class */
    class AliasResourceEntity extends ResourceEntity {
    }

    return AliasResourceEntity
  }
}

Object.assign(AliasResource, {})

module.exports = AliasResource
