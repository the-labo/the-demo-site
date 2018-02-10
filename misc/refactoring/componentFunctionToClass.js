#!?usr/bin/env node

'use strict'

process.chdir(`${__dirname}/../..`)

const theRefactor = require('the-refactor').create
const functionToReactComponentClass = require('the-refactor/lib/converters/functionToReactComponentClass')

void async function () {
  const refactor = theRefactor()
  await refactor.convert(
    'client/ui/views/**/*.jsx',
    (c) => functionToReactComponentClass(c, {
      decorators: ['@cycled', '@localized', '@titled()']
    })
  )
  await refactor.rewrite(
    'client/ui/bounds/**/*.jsx',
    {
      'Impl ({': ' ({',
      'asBound(': 'stateful(',
      'asForm(': 'stateful(',
      'import { asForm } from \'../../wrappers\'': 'import {localized, stateful} from \'the-component-mixins\'',
      'import { asForm } from \'../../../wrappers\'': 'import {localized, stateful} from \'the-component-mixins\''
    }
  )

  await refactor.rewrite(
    'client/ui/layouts/**/*.jsx',
    {
      'Impl ({': ' ({',
      'asBound(': 'stateful(',
    }
  )

  await refactor.convert(
    'client/ui/bounds/**/*.jsx',
    (c) => functionToReactComponentClass(c, {
      decorators: ['@localized']
    })
  )

  await refactor.convert(
    'client/ui/layouts/**/*.jsx',
    (c) => functionToReactComponentClass(c, {
      decorators: ['@localized']
    })
  )

  await refactor.rewrite(
    'client/ui/views/!(index).jsx',
    {
      'bounds': 'stateful'
    }
  )
}()

