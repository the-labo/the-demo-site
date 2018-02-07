/**
 * AdminUserList component
 */
'use strict'

import React from 'react'
import c from 'classnames'
import { TheOperationList, } from 'the-site-components'
import { withLoc } from 'the-loc'
import { asPure, compose, asBound, } from 'the-hoc'
import { withMoment } from '../../../wrappers'

const AdminUserList = compose(
  withLoc,
  asPure,
  withMoment,
)(function AdminUserListImpl ({
                                checks,
                                className,
                                formatDate,
                                l,
                                onSort,
                                onUpdateCheck,
                                sort,
                                users,
                              }) {
  return (
    <div className={c(className)}>
      <TheOperationList entities={users}
                        {...{l, onSort, onUpdateCheck, sort,}}
                        fields={{
                          'profile.email': {
                            label: l('labels.USER_EMAIL'),
                            sortable: true,
                          },
                          'profile.name': {
                            label: l('labels.USER_PROFILE_NAME'),
                            sortable: true,
                          },
                          'sign.signInAt': {
                            label: l('labels.USER_SIGN_IN_AT'),
                            render: (signInAt) => signInAt && formatDate(signInAt, 'lll'),
                            sortable: true,
                          },
                          name: {
                            label: l('labels.USER_NAME'),
                            sortable: true,
                          },
                        }}
                        isChecked={({id,}) => checks[id]}
                        isFreezed={({id,}) => id === 'superadmin'}

      />
    </div>
  )
})

export default asBound(
  AdminUserList,
  (state) => ({
    checks: state['admin.user.check.values'],
    sort: state['admin.user.list.sort'],
    users: state['admin.user.list.entities'],
  }),
  ({
     adminUserCheckScene,
     adminUserListScene,
   }) => ({
    onSort: async (name) => {
      adminUserListScene.set({pageNumber: 1,})
      adminUserListScene.setSort(name)
      await adminUserListScene.doSync()
    },
    onUpdateCheck: (v) => adminUserCheckScene.setValues(v),
  })
)
