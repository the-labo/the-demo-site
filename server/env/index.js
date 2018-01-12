'use strict'

const theEnv = require('the-env').default
const Local = require('../../Local')

const config = {
  database: require('./database'),
  seal: require('./seal'),
  mail: require('./mail'),
  redis: require('./redis')
}

const vars = {Local}

const env = theEnv(config, {vars}).forEnv()
module.exports = env

