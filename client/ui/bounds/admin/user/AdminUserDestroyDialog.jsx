/**
 * AdminUserDestroyDialog component
 */
'use strict'

import React from 'react'
import { TheDestroyDialog, } from 'the-site-components'
import { withLoc } from 'the-loc'
import { compose, asBound } from 'the-hoc'

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
      <TheDestroyDialog title={l('titles.ADMIN_USER_DESTROY_CONFIRM_TITLE')}
                        lead={l('leads.ADMIN_USER_DESTROY_CONFIRM')}
                        entities={users}
                        renderItem={({displayName}) => displayName}
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
    }
  })
)
