/**
 * UserList component
 */
'use strict'

import React from 'react'
import c from 'classnames'
import { TheOperationList, } from 'the-site-components'
import { withLoc } from 'the-loc'
import { asPure, compose, asBound, } from 'the-hoc'
import { withMoment } from '../../wrappers'

const UserList = compose(
  withLoc,
  asPure,
  withMoment,
)(function UserListImpl ({
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
                          name: {
                            label: l('labels.USER_NAME'),
                            sortable: true,
                          },
                          'profile.name': {
                            label: l('labels.USER_PROFILE_NAME'),
                            sortable: true,
                          },
                          'profile.email': {
                            label: l('labels.USER_EMAIL'),
                            sortable: true,
                          },
                          'sign.signInAt': {
                            label: l('labels.USER_SIGNIN_AT'),
                            render: (signInAt) => signInAt && formatDate(signInAt, 'lll'),
                            sortable: true,
                          },
                        }}
                        isChecked={({id}) => checks[id]}
                        isFreezed={({id}) => id === 'superadmin'}

      />
    </div>
  )
})

export default asBound(
  UserList,
  (state) => ({
    checks: state['userCheck.values'],
    sort: state['userList.sort'],
    users: state['userList.entities'],
  }),
  ({
     userCheckScene,
     userListScene,
   }) => ({
    onSort: async (name) => {
      userListScene.setSort(name)
      await userListScene.doSync()
    },
    onUpdateCheck: (v) => userCheckScene.setValues(v),
  })
)
