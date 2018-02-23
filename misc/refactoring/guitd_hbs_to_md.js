#!/usr/bin/env node
/**
 * Do refactoring
 */
'use strict'

process.chdir(`${__dirname}/../..`)

const theRefactor = require('the-refactor').create
const refactor = theRefactor()

void async function () {
  refactor.rename('doc/guides/*.hbs', () => ({
    extname: ''
  }))
}()