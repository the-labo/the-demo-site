/**
 * Local variables
 * @file Local
 */

'use strict'

const theSeat = require('the-seat')
const theSetting = require('the-setting')
const pkg = require('./package.json')
const {seatAccess} = require('the-site-util')

const seat = theSeat()
const {
  portNumberFor,
  containerNameFor,
  processNameFor
} = seatAccess(seat)

const setting = theSetting(`${__dirname}/var/app/setting.json`, {
  APP_DOMAIN: 'the-demo-site.com',
  DUMP_SCHEDULE: '00 00 * * 3',
  DUMP_ROTATION: 3,
  // https://github.com/the-labo/the-date/blob/master/doc/helps/TimeZones.md
  TIMEZONE: 'Asia/Tokyo'
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
  BACKUP_PROCESS_NAME: processNameFor(`${pkg.name}@${__dirname}`) + '-backup'
})

const Local = Object.assign({
  askSetting: () => setting.ask()
}, Vars, setting.get())

module.exports = Local

if (!module.parent) {
  console.log(JSON.stringify(Local, null, '  '))
}
