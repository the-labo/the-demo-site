/**
 * AdminUserPasswordDialog component
 */
'use strict'

import React from 'react'
import { localized } from 'the-component-mixins'
import { asBound, compose } from 'the-hoc'
import {
  TheOperationDialog,
} from 'the-site-components'

const AdminUserPasswordDialog = compose(
  localized
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
      <TheOperationDialog doneLead={l('leads.RESET_PASSWORDS_RESULT')}
                          doneTitle={l('titles.ADMIN_USER_PASSWORD_RESET_RESULT_TITLE')}
                          entities={users}
                          lead={l('leads.RESET_PASSWORDS_CONFIRM')}
                          renderItem={(user) => user.displayName}
                          result={passwords && users
                            .reduce((data, user) => Object.assign(data, {
                              [user.displayName]: passwords[user.id],
                            }), {})
                          }
                          title={l('titles.ADMIN_USER_PASSWORD_RESET_CONFIRM_TITLE')}
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
