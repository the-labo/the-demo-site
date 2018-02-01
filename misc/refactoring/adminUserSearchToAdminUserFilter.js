#!/usr/bin/env node
/**
 * Do refactoring
 */
'use strict'

process.chdir(`${__dirname}/../..`)

const theRefactor = require('the-refactor').create
const refactor = theRefactor()

void async function () {

  await refactor.rename([
    'client/scopes/admin/user/search.json'
  ], ({basename}) => ({basename: 'filter'}))

  await refactor.rename([
    'client/**/AdminUserSearch*.*'
  ], ({basename}) => ({
    basename: basename.replace('AdminUserSearch', 'AdminUserFilter')
  }))

  await refactor.rewrite([
    'client/**/*.*',
  ], {
    'admin.user.search': 'admin.user.filter',
    'AdminUserSearch': 'AdminUserFilter',
    'adminUserSearch': 'adminUserFilter',
  })

}()
