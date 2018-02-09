#!?usr/bin/env node

'use strict'

process.chdir(`${__dirname}/../..`)

const theRefactor = require('the-refactor').create
const functionToReactComponentClass = require('the-refactor/lib/converters/functionToReactComponentClass')

void async function () {
  const refactor = theRefactor()
  await refactor.convert(
    'client/ui/views/**/*.jsx',
    functionToReactComponentClass
  )
}()

