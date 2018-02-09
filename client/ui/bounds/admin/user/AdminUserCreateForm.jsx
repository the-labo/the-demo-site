/**
 * AdminUserCreateForm component
 */
'use strict'

import { RoleCodes } from '@self/conf'
import React from 'react'
import { TheUserCreateForm } from 'the-site-components'
import { asForm } from '../../../wrappers'

function AdminUserCreateForm (props) {
  const {l} = props
  return (
    <TheUserCreateForm {...props}
                       roles={{
                         [RoleCodes.ADMIN_ROLE]: l('roleCodes.ADMIN_ROLE'),
                         [RoleCodes.NORMAL_ROLE]: l('roleCodes.NORMAL_ROLE'),
                       }}
    />
  )
}

export default asForm(
  AdminUserCreateForm,
  (state) => ({
    errors: state['admin.user.create.entryErrors'],
    spinning: state['admin.user.create.busy'],
    values: state['admin.user.create.entry'],
  }),
  ({
     adminUserCreateScene,
     adminUserListScene,
     l,
     toastScene,
   }) => ({
    onSubmit: async () => {
      await adminUserCreateScene.doCreate()
      adminUserCreateScene.set({done: true})
      toastScene.showInfo(l('toasts.ADMIN_USER_CREATE_DID_SUCCESS'))
      await adminUserListScene.doSync()
    },
    onUpdate: (v) => adminUserCreateScene.setEntry(v),
  })
)
