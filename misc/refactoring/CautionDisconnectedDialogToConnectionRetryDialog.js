#!/usr/bin/env node
/**
 * Do refactoring
 */
'use strict'

process.chdir(`${__dirname}/../..`)

const path = require('path')
const theRefactor = require('the-refactor').create
const refactor = theRefactor()

void async function () {

  await refactor.rename([
    'client/ui/stateful/caution/CautionDisconnectedDialog.jsx'
  ], ({dirname}) => ({
    dirname: path.resolve(dirname, '../connection'),
    basename: 'ConnectionRetryDialog'
  }))

  await refactor.rewrite([
    'client/ui/**/*.jsx',
    'client/client/**/*.js',
    'client/scenes/**/*.js',
  ], {
    'CautionDisconnected': 'ConnectionRetry',
    'cautionDisconnected': 'connectionRetry',
    'caution.disconnected': 'connection.retry'
  })

  await refactor.rewrite([
    'conf/**/*.json'
  ], {
    'CAUTION_DISCONNECTED': 'CONNECTION_RETRY',
  })

  await refactor.rename([
    'client/scopes/caution/disconnected.json'
  ], ({dirname}) => ({
    dirname: path.resolve(dirname, '../connection'),
    basename: 'retry'
  }))

  await refactor.rename([
    'client/scopes/caution/.index.js.bud'
  ], ({dirname}) => ({
    dirname: path.resolve(dirname, '../connection'),
  }))

  await refactor.rename([
    'client/scenes/CautionDisconnectedScene.js'
  ], ({}) => ({
    basename: 'ConnectionRetryScene'
  }))

}()