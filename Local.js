/**
 * Local variables
 * @file Local
 */

'use strict'

const theSeat = require('the-seat')
const seat = theSeat()
const pkg = require('./package.json')
const crypto = require('crypto')

const portFor = (name, portBase = 6000) =>
  seat.scope('ports').acquire(name, (port = portBase) => port + 1)

const containerFor = (name, length = 4) => [
  name.split('@')[0],
  seat.scope('containers').acquire(name, () => crypto.randomBytes(length).toString('hex'))
].join('-')

const processFor = (name, length = 4) => [
  name.split('@')[0],
  seat.scope('processes').acquire(name, () => crypto.randomBytes(length).toString('hex'))
].join('-')

const Vars = Object.freeze({
  APP_PORT: portFor(`app@${__dirname}`),

  MYSQL_PUBLISHED_PORT: portFor(`mysql@${__dirname}`),
  REDIS_PUBLISHED_PORT: portFor(`redis@${__dirname}`),
  NGINX_PUBLISHED_PORT: portFor(`nginx@${__dirname}`),

  MYSQL_CONTAINER_NAME: containerFor(`${pkg.name}-mysql@${__dirname}`),
  REDIS_CONTAINER_NAME: containerFor(`${pkg.name}-redis@${__dirname}`),
  NGINX_CONTAINER_NAME: containerFor(`${pkg.name}-nginx@${__dirname}`),

  APP_PROCESS_NAME: processFor(`${pkg.name}-app@${__dirname}`)

})

const Local = Object.assign({
  toEnv () {
    return Object.assign({}, Vars)
  }
}, Vars)

module.exports = Local

if (!module.parent) {
  console.log(JSON.stringify(Local, null, '  '))
}
