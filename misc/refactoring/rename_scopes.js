#!/usr/bin/env node
/**
 * Do refactoring
 */
'use strict'

process.chdir(`${__dirname}/../..`)

const theRefactor = require('the-refactor').create
const {pascalcase, camelcase,} = require('stringcase')
const path = require('path')

const refactor = theRefactor()
void async function () {

  await refactor.renameDir('client/store/scopes', 'client/scopes')

  await refactor.rewrite('client/store/create.js', {
    'require(\'./scopes\')': 'require(\'../scopes\')'
  })

  await refactor.rename('client/scopes/user*.json', ({dirname,}) => ({
    dirname: path.join(dirname, 'admin'),
  }))

  await refactor.rename('client/scopes/admin/user*.json', ({dirname, basename,}) => ({
    dirname: path.join(dirname, 'user'),
    basename: camelcase(basename.replace(/^user/, '')),
  }))

  await refactor.rename('client/scopes/recover*.json', ({dirname, basename,}) => ({
    dirname: path.join(dirname, 'recover'),
    basename: camelcase(basename.replace(/^recover/, '')),
  }))

  await refactor.rename('client/scopes/sign*.json', ({dirname, basename,}) => ({
    dirname: path.join(dirname, 'sign'),
    basename: camelcase(basename.replace(/^sign/, '')),
  }))

  await refactor.rename('client/scopes/verify*.json', ({dirname, basename,}) => ({
    dirname: path.join(dirname, 'verify'),
    basename: camelcase(basename.replace(/^verify/, '')),
  }))

  await refactor.rename('client/scopes/caution*.json', ({dirname, basename,}) => ({
    dirname: path.join(dirname, 'caution'),
    basename: camelcase(basename.replace(/^caution/, '')),
  }))

  await refactor.rename('client/scopes/password*.json', ({dirname, basename,}) => ({
    dirname: path.join(dirname, 'password'),
    basename: camelcase(basename.replace(/^password/, '')),
  }))

  await refactor.rename('client/scopes/profile*.json', ({dirname, basename,}) => ({
    dirname: path.join(dirname, 'profile'),
    basename: camelcase(basename.replace(/^profile/, '')),
  }))

  await refactor.rename('client/scopes/profile*.json', ({dirname, basename,}) => ({
    dirname: path.join(dirname, 'profile'),
    basename: camelcase(basename.replace(/^profile/, '')),
  }))

  await refactor.scatter('client/scopes/.index.js.bud', [
    'client/scopes/abstract',
    'client/scopes/admin',
    'client/scopes/admin/user',
    'client/scopes/caution',
    'client/scopes/password',
    'client/scopes/profile',
    'client/scopes/recover',
    'client/scopes/sign',
    'client/scopes/verify',
  ])

  await refactor.rename('client/scenes/User*Scene.js', ({
                                                          basename
                                                        }) => ({
    basename: 'Admin' + pascalcase(basename),
  }))

  await refactor.rewrite('client/scenes/AdminUser*Scene.js', {
    '@bindScope(\'user': '@bindScope(\'admin.user',
    'class User': 'class AdminUser',
    '* User': '* AdminUser',
    'lends User': 'lends AdminUser',
    'extends User': 'extends AdminUser',
    'exports = User': 'exports = AdminUser',
    'userCtrl': 'adminUserCtrl',
  })

  await refactor.rename('client/ui/bounds/user/User*.jsx', ({
                                                              dirname,
                                                              basename
                                                            }) => ({
    dirname: path.join(dirname, '..', 'admin/user'),
    basename: 'Admin' + pascalcase(basename),
  }))

  await refactor.rewrite('client/ui/bounds/admin/user/AdminUser*.jsx', {
    'class User': 'class AdminUser',
    'const User': 'const AdminUser',
    '* User': '* AdminUser',
    'lends User': 'lends AdminUser',
    '  User': '  AdminUser',
    '     user': '     adminUser',
    ': () => user': ': () => adminUser',
    'await user': 'await adminUser',
    'state[\'user': 'state[\'admin.user',
    'titles.USERS': 'titles.ADMIN_USER',
    'titles.USER_': 'titles.ADMIN_USER_',
    'toasts.USER': 'toasts.ADMIN_USER',
    'import User': 'import AdminUser',
    '<User': '<AdminUser',
    './User': './AdminUser',
    'function User': 'function AdminUser',
    'leads.USER': 'leads.ADMIN_USER',
    'adminUsers,': 'users,',
    ') => user': ') => adminUser',
    '\'../../wrappers\'': '\'../../../wrappers\'',
    'userCheckScene': 'adminUserCheckScene',
    'userListScene': 'adminUserListScene',
    'userPasswordScene': 'adminUserPasswordScene',
    'userDestroyScene': 'adminUserDestroyScene',
    'userCreateScene': 'adminUserCreateScene',
  })

  await refactor.rename('server/controllers/User*.js', ({
                                                          dirname,
                                                          basename,
                                                        }) => ({
    dirname: path.join(dirname, 'admin'),
    basename: 'Admin' + pascalcase(basename),
  }))

  await refactor.rewrite('server/controllers/admin/Admin*Ctrl.js', {
    '* UserCtrl': '* AdminUserCtrl',
    'const UserCtrl': 'const AdminUserCtrl',
    'class UserCtrl': 'class AdminUserCtrl',
    'lends UserCtrl': 'lends AdminUserCtrl',
    'extends UserCtrl': 'extends AdminUserCtrl',
    'exports = UserCtrl': 'exports = AdminUserCtrl',
    'require(\'./Ctrl\')': 'require(\'../Ctrl\')',
    'require(\'./concerns\')': 'require(\'../concerns\')',
  })

  await refactor.rename('client/ui/views/manage/User*.*', ({
                                                             dirname,
                                                             basename,

                                                           }) => ({
    dirname: path.join(dirname, '..', 'admin'),
    basename: 'Admin' + pascalcase(basename),
  }))

  await refactor.rewrite('client/ui/views/admin/AdminUser*.jsx', {
    'class User': 'class AdminUser',
    'const User': 'const AdminUser',
    '* User': '* AdminUser',
    'lends User': 'lends AdminUser',
    '  User': '  AdminUser',
    '     user': '     adminUser',
    ': () => user': ': () => adminUser',
    'await user': 'await adminUser',
    'state[\'user': 'state[\'admin.user',
    'titles.USERS': 'titles.ADMIN_USER',
    'titles.USER_': 'titles.ADMIN_USER_',
    'toasts.USER': 'toasts.ADMIN_USER',
    'import User': 'import AdminUser',
    '<User': '<AdminUser',
    './User': './AdminUser',
    'function User': 'function AdminUser',
    'leads.USER': 'leads.ADMIN_USER',
    'adminUsers,': 'users,',
    'titles.SIGNUP':'titles.SIGN_UP',
    'titles.SIGNIN':'titles.SIGN_IN',
    'titles.SIGNOUT':'titles.SIGN_OUT',
    'titles.SIGNASK':'titles.SIGN_ASK',
  })

  await refactor.rewrite('client/ui/**/*.jsx', {
    [/(state\['admin)([A-Z])/]: ($0, $1, $2) => [$1, $2.toLowerCase()].join('.'),
    [/(state\['admin.user)([A-Z])/]: ($0, $1, $2) => [$1, $2.toLowerCase()].join('.'),
    [/(state\['caution)([A-Z])/]: ($0, $1, $2) => [$1, $2.toLowerCase()].join('.'),
    [/(state\['password)([A-Z])/]: ($0, $1, $2) => [$1, $2.toLowerCase()].join('.'),
    [/(state\['profile)([A-Z])/]: ($0, $1, $2) => [$1, $2.toLowerCase()].join('.'),
    [/(state\['recover)([A-Z])/]: ($0, $1, $2) => [$1, $2.toLowerCase()].join('.'),
    [/(state\['sign)([A-Z])/]: ($0, $1, $2) => [$1, $2.toLowerCase()].join('.'),
    [/(state\['verify)([A-Z])/]: ($0, $1, $2) => [$1, $2.toLowerCase()].join('.'),
  })

  await refactor.rewrite('client/scenes/*.js', {
    [/(@bindScope\('admin)([A-Z])/]: ($0, $1, $2) => [$1, $2.toLowerCase()].join('.'),
    [/(@bindScope\('admin.user)([A-Z])/]: ($0, $1, $2) => [$1, $2.toLowerCase()].join('.'),
    [/(@bindScope\('caution)([A-Z])/]: ($0, $1, $2) => [$1, $2.toLowerCase()].join('.'),
    [/(@bindScope\('password)([A-Z])/]: ($0, $1, $2) => [$1, $2.toLowerCase()].join('.'),
    [/(@bindScope\('profile)([A-Z])/]: ($0, $1, $2) => [$1, $2.toLowerCase()].join('.'),
    [/(@bindScope\('recover)([A-Z])/]: ($0, $1, $2) => [$1, $2.toLowerCase()].join('.'),
    [/(@bindScope\('sign)([A-Z])/]: ($0, $1, $2) => [$1, $2.toLowerCase()].join('.'),
    [/(@bindScope\('verify)([A-Z])/]: ($0, $1, $2) => [$1, $2.toLowerCase()].join('.'),
  })

  await refactor.rewrite('client/ui/Routes.jsx', {
    'component={v.UserManageView}': 'component={v.AdminUserManageView}',
  })

  await refactor.rewrite('conf/locales/*/titles.json', {
    '"USERS_': '"ADMIN_USER_',
    '"USER_': '"ADMIN_USER_',
    '"SIGNIN': '"SIGN_IN',
    '"SIGNASK': '"SIGN_ASK',
    '"SIGNOUT': '"SIGN_OUT',
    '"SIGNUP': '"SIGN_UP',
  })
  await refactor.rewrite('conf/locales/*/leads.json', {
    '"USERS_': '"ADMIN_USER_',
    '"USER_': '"ADMIN_USER_',
    '"SIGNIN': '"SIGN_IN',
    '"SIGNASK': '"SIGN_ASK',
    '"SIGNOUT': '"SIGN_OUT',
    '"SIGNUP': '"SIGN_UP',
  })
}()
