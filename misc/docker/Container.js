'use strict'

const DockerPortBase = 4999

module.exports = Object.freeze({
  MYSQL_IMAGE: 'mysql:8',
  MYSQL_PUBLISHED_PORT: DockerPortBase,
  REDIS_IMAGE: 'redis:4',
  REDIS_PUBLISHED_PORT: DockerPortBase + 1,
  NGINX_IMAGE: 'nginx:1.13',
  NGINX_PUBLISHED_PORT: DockerPortBase + 2
})
