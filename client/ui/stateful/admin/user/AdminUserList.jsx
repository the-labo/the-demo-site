/**
 * AdminUserList component
 */
'use strict'

import c from 'classnames'
import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { TheImage } from 'the-components'
import { TheOperationList } from 'the-site-components'
import { withMoment } from '../../../wrappers'
import { withRole } from '../../../wrappers'

@withRole
@withMoment
@localized
class AdminUserList extends React.Component {
  render () {
    const {
      busy,
      checks,
      className,
      formatDate,
      l,
      onSort,
      onUpdateCheck,
      roles,
      sort,
      users,
    } = this.props

    return (
      <div className={c(className)}>
        <TheOperationList {...{busy, l, onSort, onUpdateCheck, sort}}
                          entities={users}
                          fields={{
                            'name': {
                              label: l('labels.USER_NAME'),
                              sortable: true,
                            },
                            'profile.email': {
                              label: l('labels.USER_EMAIL'),
                              sortable: true,
                            },
                            'profile.image': {
                              label: l('labels.USER_IMAGE'),
                              render: (image) => image && <TheImage height={40} scale='fit' src={image} width={40}/>,
                              sortable: false,
                            },
                            'profile.name': {
                              label: l('labels.USER_PROFILE_NAME'),
                              sortable: true,
                            },
                            'role.code': {
                              label: l('labels.USER_ROLE'),
                              render: (code) => roles[code] || code,
                              sortable: true,
                            },
                            'sign.signInAt': {
                              label: l('labels.USER_SIGN_IN_AT'),
                              render: (signInAt) => signInAt && formatDate(signInAt, 'lll'),
                              sortable: true,
                            },
                          }}
                          isChecked={({id}) => checks[id]}
                          isFreezed={({id}) => id === 'superadmin'}
                          keys={['name', 'profile.email', 'profile.name', 'profile.image', 'role.code', 'sign.signInAt']}

        />
      </div>
    )
  }
}

export default stateful(
  (state) => ({
    busy: state['admin.user.list.busy'],
    checks: state['admin.user.check.values'],
    sort: state['admin.user.list.sort'],
    users: state['admin.user.list.entities'],
  }),
  ({
     adminUserCheckScene,
     adminUserListScene,
   }) => ({
    onSort: async (name) => {
      adminUserListScene.set({pageNumber: 1})
      adminUserListScene.setSort(name)
      await adminUserListScene.doSync()
    },
    onUpdateCheck: (v) => adminUserCheckScene.setValues(v),
  })
)(AdminUserList)
