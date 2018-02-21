/**
 * AdminUserRoleForm component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { withForm } from 'the-components'
import { TheUsersRoleForm } from 'the-site-components'
import { withRole } from '../../../wrappers'

@withRole
@withForm
@localized
class AdminUserRoleForm extends React.Component {
  render () {
    const {roles} = this.props
    return (
      <TheUsersRoleForm {...this.props}
                        roles={roles}
      />
    )
  }
}

export default stateful(
  (state) => ({
    errors: state['admin.user.role.entryErrors'],
    spinning: state['admin.user.role.busy'],
    values: state['admin.user.role.entry'],
  }),
  ({
     adminUserCheckScene: checkScene,
     adminUserListScene: listScene,
     adminUserRoleScene: roleScene,
     l,
     toastScene,
   }) => ({
    onSubmit: async () => {
      await roleScene.doExec()
      roleScene.set({active: false})
      toastScene.showInfo(l('toasts.ROLE_UPDATE_DID_SUCCESS'))
      checkScene.init()
      await listScene.doSync()
    },
    onUpdate: (v) => roleScene.setEntry(v),
  }),
)(AdminUserRoleForm)
