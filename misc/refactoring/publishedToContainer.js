#!/usr/bin/env node
/**
 * Do refactoring
 */
'use strict'

process.chdir(`${__dirname}/../..`)

const theRefactor = require('the-refactor').create
const refactor = theRefactor()

void async function () {

  await refactor.rewrite([
    '*.js',
    'misc/**/*.js',
    'misc/**/*.json',
    'server/**/*.js',
    'server/**/*.json',
  ], {
    ['PUBLISHED_' + 'PORT']: 'CONTAINER_PORT'
  })

}()
