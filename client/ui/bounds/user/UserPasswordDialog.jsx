/**
 * UserPasswordDialog component
 */
'use strict'

import React from 'react'
import { withLoc } from 'the-loc'
import { compose, asBound, } from 'the-hoc'
import {
  TheOperationDialog,
} from 'the-site-components'

const UserPasswordDialog = compose(
  withLoc
)(
  function UserPasswordDialogImpl ({
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
      <TheOperationDialog title={l('titles.USERS_PASSWORD_RESET_CONFIRM_TITLE')}
                          lead={l('leads.RESET_PASSWORDS_CONFIRM')}
                          doneTitle={l('titles.USERS_PASSWORD_RESET_RESULT_TITLE')}
                          doneLead={l('leads.RESET_PASSWORDS_RESULT')}
                          result={passwords && users
                            .reduce((data, user) => Object.assign(data, {
                              [user.displayName]: passwords[user.id]
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
  UserPasswordDialog,
  (state) => ({
    active: state['userPassword.active'],
    done: state['userPassword.done'],
    passwords: state['userPassword.result'],
    spinning: state['userPassword.busy'],
    users: state['userPassword.targets'],
  }),
  ({
     userCheckScene,
     userPasswordScene,
   }, propsProxy) => ({
    onClose: () => userPasswordScene.set({
      active: false,
      done: false
    }),
    onYes: async () => {
      await userPasswordScene.doReset()
      userPasswordScene.set({done: true})
      userCheckScene.init()
    }
  })
)
