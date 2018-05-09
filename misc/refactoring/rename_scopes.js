#!/usr/bin/env node
/**
 * Do refactoring
 */
'use strict'

process.chdir(`${__dirname}/../..`)

const path = require('path')
const {camelcase, pascalcase} = require('stringcase')
const theRefactor = require('the-refactor').create

const refactor = theRefactor()
void async function () {

  await refactor.renameDir('client/store/scopes', 'client/scopes')

  await refactor.rewrite('client/store/create.js', {
    'require(\'./scopes\')': 'require(\'../scopes\')',
  })

  await refactor.rename('client/scopes/user*.json', ({dirname}) => ({
    dirname: path.join(dirname, 'admin'),
  }))

  await refactor.rename('client/scopes/admin/user*.json', ({basename, dirname}) => ({
    basename: camelcase(basename.replace(/^user/, '')),
    dirname: path.join(dirname, 'user'),
  }))

  await refactor.rename('client/scopes/recover*.json', ({basename, dirname}) => ({
    basename: camelcase(basename.replace(/^recover/, '')),
    dirname: path.join(dirname, 'recover'),
  }))

  await refactor.rename('client/scopes/sign*.json', ({basename, dirname}) => ({
    basename: camelcase(basename.replace(/^sign/, '')),
    dirname: path.join(dirname, 'sign'),
  }))

  await refactor.rename('client/scopes/verify*.json', ({basename, dirname}) => ({
    basename: camelcase(basename.replace(/^verify/, '')),
    dirname: path.join(dirname, 'verify'),
  }))

  await refactor.rename('client/scopes/caution*.json', ({basename, dirname}) => ({
    basename: camelcase(basename.replace(/^caution/, '')),
    dirname: path.join(dirname, 'caution'),
  }))

  await refactor.rename('client/scopes/password*.json', ({basename, dirname}) => ({
    basename: camelcase(basename.replace(/^password/, '')),
    dirname: path.join(dirname, 'password'),
  }))

  await refactor.rename('client/scopes/profile*.json', ({basename, dirname}) => ({
    basename: camelcase(basename.replace(/^profile/, '')),
    dirname: path.join(dirname, 'profile'),
  }))

  await refactor.rename('client/scopes/profile*.json', ({basename, dirname}) => ({
    basename: camelcase(basename.replace(/^profile/, '')),
    dirname: path.join(dirname, 'profile'),
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
                                                          basename,
                                                        }) => ({
    basename: 'Admin' + pascalcase(basename),
  }))

  await refactor.rewrite('client/scenes/AdminUser*Scene.js', {
    '@bindScope(\'user': '@bindScope(\'admin.user',
    '* User': '* AdminUser',
    'class User': 'class AdminUser',
    'exports = User': 'exports = AdminUser',
    'extends User': 'extends AdminUser',
    'lends User': 'lends AdminUser',
    'userCtrl': 'adminUserCtrl',
  })

  await refactor.rename('client/ui/bounds/user/User*.jsx', ({
                                                              basename,
                                                              dirname,
                                                            }) => ({
    basename: 'Admin' + pascalcase(basename),
    dirname: path.join(dirname, '..', 'admin/user'),
  }))

  await refactor.rewrite('client/ui/bounds/admin/user/AdminUser*.jsx', {
    '     user': '     adminUser',
    '  User': '  AdminUser',
    ': () => user': ': () => adminUser',
    './User': './AdminUser',
    '\'../../wrappers\'': '\'../../../wrappers\'',
    ') => user': ') => adminUser',
    '* User': '* AdminUser',
    '<User': '<AdminUser',
    'adminUsers,': 'users,',
    'await user': 'await adminUser',
    'class User': 'class AdminUser',
    'const User': 'const AdminUser',
    'function User': 'function AdminUser',
    'import User': 'import AdminUser',
    'leads.USER': 'leads.ADMIN_USER',
    'lends User': 'lends AdminUser',
    'state[\'user': 'state[\'admin.user',
    'titles.USER_': 'titles.ADMIN_USER_',
    'titles.USERS': 'titles.ADMIN_USER',
    'toasts.USER': 'toasts.ADMIN_USER',
    'userCheckScene': 'adminUserCheckScene',
    'userCreateScene': 'adminUserCreateScene',
    'userDestroyScene': 'adminUserDestroyScene',
    'userListScene': 'adminUserListScene',
    'userPasswordScene': 'adminUserPasswordScene',
  })

  await refactor.rename('server/controllers/User*.js', ({
                                                          basename,
                                                          dirname,
                                                        }) => ({
    basename: 'Admin' + pascalcase(basename),
    dirname: path.join(dirname, 'admin'),
  }))

  await refactor.rewrite('server/controllers/admin/Admin*Ctrl.js', {
    '* UserCtrl': '* AdminUserCtrl',
    'class UserCtrl': 'class AdminUserCtrl',
    'const UserCtrl': 'const AdminUserCtrl',
    'exports = UserCtrl': 'exports = AdminUserCtrl',
    'extends UserCtrl': 'extends AdminUserCtrl',
    'lends UserCtrl': 'lends AdminUserCtrl',
    'require(\'./concerns\')': 'require(\'../concerns\')',
    'require(\'./Ctrl\')': 'require(\'../Ctrl\')',
  })

  await refactor.rename('client/ui/views/manage/User*.*', ({
                                                             basename,
                                                             dirname,

                                                           }) => ({
    basename: 'Admin' + pascalcase(basename),
    dirname: path.join(dirname, '..', 'admin'),
  }))

  await refactor.rewrite('client/ui/views/admin/AdminUser*.jsx', {
    '     user': '     adminUser',
    '  User': '  AdminUser',
    ': () => user': ': () => adminUser',
    './User': './AdminUser',
    '* User': '* AdminUser',
    '<User': '<AdminUser',
    'adminUsers,': 'users,',
    'await user': 'await adminUser',
    'class User': 'class AdminUser',
    'const User': 'const AdminUser',
    'function User': 'function AdminUser',
    'import User': 'import AdminUser',
    'leads.USER': 'leads.ADMIN_USER',
    'lends User': 'lends AdminUser',
    'state[\'user': 'state[\'admin.user',
    'titles.SIGN_OUT': 'titles.SIGN_OUT',
    'titles.SIGNASK': 'titles.SIGN_ASK',
    'titles.SIGNIN': 'titles.SIGN_IN',
    'titles.SIGNUP': 'titles.SIGN_UP',
    'titles.USER_': 'titles.ADMIN_USER_',
    'titles.USERS': 'titles.ADMIN_USER',
    'toasts.USER': 'toasts.ADMIN_USER',
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
    '"SIGN_OUT': '"SIGN_OUT',
    '"SIGNASK': '"SIGN_ASK',
    '"SIGNIN': '"SIGN_IN',
    '"SIGNUP': '"SIGN_UP',
    '"USER_': '"ADMIN_USER_',
    '"USERS_': '"ADMIN_USER_',
  })
  await refactor.rewrite('conf/locales/*/leads.json', {
    '"SIGN_OUT': '"SIGN_OUT',
    '"SIGNASK': '"SIGN_ASK',
    '"SIGNIN': '"SIGN_IN',
    '"SIGNUP': '"SIGN_UP',
    '"USER_': '"ADMIN_USER_',
    '"USERS_': '"ADMIN_USER_',
  })
  await refactor.rewrite('+(server|client|conf)/**/*.*', {
    'SIGNASK': 'SIGN_ASK',
    'SIGNIN': 'SIGN_IN',
    'SIGNOUT': 'SIGN_OUT',
    'SIGNUP': 'SIGN_UP',
  })
}()
