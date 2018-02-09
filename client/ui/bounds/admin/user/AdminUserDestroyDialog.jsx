/**
 * AdminUserDestroyDialog component
 */
'use strict'

import React from 'react'
import { asBound, compose } from 'the-hoc'
import { withLoc } from 'the-loc'
import { TheDestroyDialog } from 'the-site-components'

const AdminUserDestroyDialog = compose(
  withLoc
)(
  function AdminUserDestroyDialogImpl ({
                                    active,
                                    done,
                                    l,
                                    onClose,
                                    onSubmit,
                                    spinning,
                                    users,
                                  }) {
    return (
      <TheDestroyDialog entities={users}
                        lead={l('leads.ADMIN_USER_DESTROY_CONFIRM')}
                        renderItem={({displayName}) => displayName}
                        title={l('titles.ADMIN_USER_DESTROY_CONFIRM_TITLE')}
                        {...{
                          active,
                          done,
                          l,
                          onClose,
                          onSubmit,
                          spinning,
                        }}
      />
    )
  }
)

export default asBound(
  AdminUserDestroyDialog,
  (state) => ({
    active: state['admin.user.destroy.active'],
    done: state['admin.user.destroy.done'],
    spinning: state['admin.user.destroy.busy'],
    users: state['admin.user.destroy.targets'],
  }),
  ({
     adminUserCheckScene,
     adminUserDestroyScene,
     adminUserListScene,
     l,
     toastScene,
   }, propsProxy) => ({
    onClose: () => adminUserDestroyScene.set({
      active: false,
      done: false,
    }),
    onSubmit: async () => {
      await adminUserDestroyScene.doDestroy()
      adminUserDestroyScene.set({
        active: false,
        done: true,
      })
      adminUserCheckScene.init()
      toastScene.showInfo(l('toasts.ADMIN_USER_DESTROY_DID_SUCCESS'))
      await adminUserListScene.doSync()
    },
  })
)
