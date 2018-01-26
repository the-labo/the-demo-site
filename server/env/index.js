'use strict'

const theEnv = require('the-env').default
const Local = require('../../Local')

const config = {
  database: require('./database'),
  mail: require('./mail'),
  redis: require('./redis'),
  seal: require('./seal'),
}

const vars = {Local}

const env = theEnv(config, {vars}).forEnv()
module.exports = env

