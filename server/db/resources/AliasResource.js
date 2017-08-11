/**
 * Resource for URL alias
 */
'use strict'

const {Resource, DataTypes} = require('the-db')
const {STRING} = DataTypes
const uuid = require('uuid')
const numeral = require('numeral')
const {parse: parseUrl} = require('url')

class AliasResource extends Resource {
  async generateKey () {
    const Alias = this
    const num = (await Alias.count()) + 1
    return uuid.v4().split('-').pop() + numeral(num).format('000')
  }

  async ofUrl (url, options = {}) {
    const Alias = this
    const found = await Alias.first({originalUrl: url})
    if (found) {
      return found
    }
    const key = await Alias.generateKey()
    const parsed = parseUrl(url)
    const {
      protocol = parsed.protocol,
      host = parsed.host
    } = options
    const shortUrl = `${protocol}//${host}/a/${key}`
    return Alias.create({
      originalUrl: url,
      key,
      shortUrl
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
