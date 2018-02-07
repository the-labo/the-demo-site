/**
 * AdminUserPasswordDialog component
 */
'use strict'

import React from 'react'
import { withLoc } from 'the-loc'
import { compose, asBound, } from 'the-hoc'
import {
  TheOperationDialog,
} from 'the-site-components'

const AdminUserPasswordDialog = compose(
  withLoc
)(
  function AdminUserPasswordDialogImpl ({
                                          active,
                                          done,
                                          l,
                                          onClose,
                                          onYes,
                                          passwords,
                                          spinning,
                                          users,
                                        }) {
    return (
      <TheOperationDialog title={l('titles.ADMIN_USER_PASSWORD_RESET_CONFIRM_TITLE')}
                          lead={l('leads.RESET_PASSWORDS_CONFIRM')}
                          doneTitle={l('titles.ADMIN_USER_PASSWORD_RESET_RESULT_TITLE')}
                          doneLead={l('leads.RESET_PASSWORDS_RESULT')}
                          result={passwords && users
                            .reduce((data, user) => Object.assign(data, {
                              [user.displayName]: passwords[user.id],
                            }), {})
                          }
                          entities={users}
                          renderItem={(user) => user.displayName}
                          {...{
                            active,
                            done,
                            l,
                            onClose,
                            onYes,
                            spinning,
                          }}
      />
    )
  }
)

export default asBound(
  AdminUserPasswordDialog,
  (state) => ({
    active: state['admin.user.password.active'],
    done: state['admin.user.password.done'],
    passwords: state['admin.user.password.result'],
    spinning: state['admin.user.password.busy'],
    users: state['admin.user.password.targets'],
  }),
  ({
     adminUserCheckScene,
     adminUserPasswordScene,
   }, propsProxy) => ({
    onClose: () => adminUserPasswordScene.set({
      active: false,
      done: false,
    }),
    onYes: async () => {
      await adminUserPasswordScene.doReset()
      adminUserPasswordScene.set({done: true})
      adminUserCheckScene.init()
    },
  })
)
