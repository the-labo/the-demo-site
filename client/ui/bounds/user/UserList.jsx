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
import styles from './UserList.pcss'

const UserList = compose(
  withLoc,
  asPure,
  withMoment,
)(function UserListImpl ({
                           users,
                           className,
                           l,
                           sort,
                           onSort,
                           checks,
                           formatDate,
                           onUpdateCheck,
                         }) {
  return (
    <div className={c(className)}>
      <TheOperationList className={styles.table}
                        entities={users}
                        {...{l, sort, onSort, onUpdateCheck}}
                        fields={{
                          name: {
                            label: l('labels.USER_NAME'),
                            sortable: true,
                          },
                          'profile.name': {
                            label: l('labels.USER_PROFILE_NAME'),
                            sortable: true,
                            render: (_, {profile}) => profile?.name,
                          },
                          'profile.email': {
                            label: l('labels.USER_EMAIL'),
                            sortable: true,
                            render: (_, {profile}) => profile?.email,
                          },
                          'sign.signInAt': {
                            label: l('labels.USER_SIGNIN_AT'),
                            sortable: true,
                            render: (_, {sign}) => sign && formatDate(sign.signInAt, 'lll'),
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
    users: state['userList.entities'],
    sort: state['userList.sort'],
    checks: state['userCheck.values'],
  }),
  ({
     userListScene,
     userCheckScene,
   }) => ({
    onSort: async (name) => {
      userListScene.setSort(name)
      await userListScene.doSync()
    },
    onUpdateCheck: (v) => userCheckScene.setValues(v),
  })
)
