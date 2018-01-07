/**
 * UserCreateForm component
 */
'use strict'

import React from 'react'
import { TheUserCreateForm } from 'the-site-components'
import { asForm } from '../../wrappers'
import { RoleCodes } from '@self/conf'

function UserCreateForm (props) {
  const {l} = props
  return (
    <TheUserCreateForm {...props}
                       roles={{
                         [RoleCodes.ADMIN_ROLE]: l('roleCodes.ADMIN_ROLE'),
                         [RoleCodes.NORMAL_ROLE]: l('roleCodes.NORMAL_ROLE')
                       }}
    />
  )
}

export default asForm(
  UserCreateForm,
  (state) => ({
    spinning: state['userCreate.busy'],
    values: state['userCreate.entry'],
    errors: state['userCreate.entryErrors'],
  }),
  ({
     l,
     toastScene,
     userCreateScene,
     userListScene
   }) => ({
    onUpdate: (v) => userCreateScene.setEntry(v),
    onSubmit: async () => {
      await userCreateScene.doCreate()
      userCreateScene.set({done: true})
      toastScene.showInfo(l('toasts.USER_CREATE_DID_SUCCESS'))
      await userListScene.doSync()
    }
  })
)
