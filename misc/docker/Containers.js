/**
 * Docker container configurations
 * @namespace Containers
 */
'use strict'

const path = require('path')
const {isMacOS} = require('the-check')
const Local = require('../../Local')

module.exports = Object.freeze(
  /** @lends Containers */
  {
    mysql: {
      name: Local.MYSQL_CONTAINER_NAME,
      options: {
        image: 'mysql:5.7.21',
        publish: `${Local.MYSQL_CONTAINER_PORT}:3306`,
      },
    },
    nginx: {
      name: Local.NGINX_CONTAINER_NAME,
      options: {
        cert: path.resolve(__dirname, 'cert/self-signed.cert'),
        certKey: path.resolve(__dirname, 'cert/self-signed.cert.key'),
        env: {
          APP_PORT: Local.APP_PORT,
          HOST_IP: isMacOS() ? 'docker.for.mac.localhost' : '172.17.0.1',
        },
        httpPublishPort: Local.NGINX_CONTAINER_PORT,
        httpsPublishPort: Local.NGINX_CONTAINER_SECURE_PORT,
        image: 'nginx:1.13',
        template: path.resolve(__dirname, 'nginx.conf.template'),
      },
    },
    redis: {
      name: Local.REDIS_CONTAINER_NAME,
      options: {
        conf: path.resolve(__dirname, 'redis.conf'),
        image: 'redis:4',
        publish: `${Local.REDIS_CONTAINER_PORT}:6379`,
      },
    },
  }
)
