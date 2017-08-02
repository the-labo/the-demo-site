'use strict'

const theEnv = require('the-env')
const Container = require('../../misc/docker/Container')

let config = {
  port: require('./port'),
  database: require('./database'),
  redis: require('./redis')
}

const vars = { Container }

const env = theEnv(config, { vars }).forEnv()
module.exports = env
