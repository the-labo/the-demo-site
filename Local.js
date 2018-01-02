/**
 * Local variables
 * @file Local
 */

'use strict'

const theSeat = require('the-seat')
const theSetting = require('the-setting')
const theSecret = require('the-secret')
const pkg = require('./package.json')
const {inspect} = require('util')
const {seatAccess, envOf} = require('the-site-util')

const seat = theSeat()
const secret = theSecret(`${__dirname}/secrets.json`, envOf('DEMO_SITE_MASTER_PASSWORD', {strict: true}))
const {
  portNumberFor,
  containerNameFor,
  processNameFor,
  userNameFor
} = seatAccess(seat)

const setting = theSetting(`${__dirname}/var/app/setting.json`, {
  APP_DOMAIN: 'the-demo-site.work',
  APP_CDN_URL: '',
  DUMP_SCHEDULE: '00 00 * * 3',
  DUMP_ROTATION: 3
})

const Vars = Object.freeze({
  APP_PORT: portNumberFor(`app@${__dirname}`),

  MYSQL_PUBLISHED_PORT: portNumberFor(`mysql@${__dirname}`),
  REDIS_PUBLISHED_PORT: portNumberFor(`redis@${__dirname}`),
  NGINX_PUBLISHED_PORT: portNumberFor(`nginx@${__dirname}`),

  MYSQL_CONTAINER_NAME: containerNameFor(`${pkg.name}-mysql@${__dirname}`),
  REDIS_CONTAINER_NAME: containerNameFor(`${pkg.name}-redis@${__dirname}`),
  NGINX_CONTAINER_NAME: containerNameFor(`${pkg.name}-nginx@${__dirname}`),

  APP_PROCESS_NAME: processNameFor(`${pkg.name}@${__dirname}`) + '-app',
  BACKUP_PROCESS_NAME: processNameFor(`${pkg.name}@${__dirname}`) + '-backup',

  SUPER_ADMIN_NAME: userNameFor(`superadmin@${__dirname}`)
})

const Local = Object.assign(
  {__proto__: {setting, secret}},
  Vars,
  setting.get(),
  secret.get()
)

module.exports = Local

if (!module.parent) {
  console.log(inspect(Local))
}
