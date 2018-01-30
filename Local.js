/**
 * Local variables
 * @namespace Local
 */
'use strict'

const {envOf, seatAccess,} = require('the-site-util')
const {inspect,} = require('util')
const pkg = require('./package.json')
const theSeat = require('the-seat').default
const theSetting = require('the-setting').default
const theSecret = require('the-secret').default

const secret = theSecret(`${__dirname}/secrets.json`, envOf('DEMO_SITE_MASTER_PASSWORD', {strict: true,}))
const seat = theSeat()
const {
  containerNameFor,
  portNumberFor,
  processNameFor,
  secretFor,
  userNameFor,
} = seatAccess(seat)

const setting = theSetting(`${__dirname}/var/app/setting.json`,
  /** @lends Local */
  {
    APP_CDN_URL: '',
    APP_DOMAIN: 'the-demo-site.work',
    DUMP_ROTATION: 3,
    DUMP_SCHEDULE: '00 00 * * 3',
  }
)

const Vars = Object.freeze(
  /** @lends Local */
  {
    APP_PORT: portNumberFor(`app@${__dirname}`),
    APP_PROCESS_NAME: processNameFor(`${pkg.name}@${__dirname}`) + '-app',
    BACKUP_PROCESS_NAME: processNameFor(`${pkg.name}@${__dirname}`) + '-backup',
    INSPECT_PORT: portNumberFor(`inspect@${__dirname}`),
    MYSQL_CONTAINER_NAME: containerNameFor(`${pkg.name}-mysql@${__dirname}`),
    MYSQL_PUBLISHED_PORT: portNumberFor(`mysql@${__dirname}`),
    NGINX_CONTAINER_NAME: containerNameFor(`${pkg.name}-nginx@${__dirname}`),
    NGINX_PUBLISHED_PORT: portNumberFor(`nginx@${__dirname}`),
    PUBLIC_DIR: `${__dirname}/public`,
    REDIS_CONTAINER_NAME: containerNameFor(`${pkg.name}-redis@${__dirname}`),
    REDIS_PUBLISHED_PORT: portNumberFor(`redis@${__dirname}`),
    SEAL_SECRET: secretFor(`seal@${__dirname}`),
    SUPER_ADMIN_NAME: userNameFor(`superadmin@${__dirname}`),
    SUPER_ADMIN_PASSWORD: secretFor(`superadmin@${__dirname}`),
  }
)

/** @lends Local */
const Local = {
  __proto__: {
    print: () => console.log(inspect(Local)),
    secret,
    setting,
  },
  ...secret.get(),
  ...setting.get(),
  ...Vars,
}

module.exports = Local

if (!module.parent) {
  Local.print()
}
