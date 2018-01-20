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
                                     l,
                                     active,
                                     done,
                                     spinning,
                                     users,
                                     passwords,
                                     onClose,
                                     onYes,
                                   }) {
    return (
      <TheOperationDialog title={l('titles.USERS_PASSWORD_RESET_CONFIRM_TITLE')}
                          lead={l('leads.RESET_PASSWORDS_CONFIRM')}
                          doneTitle={l('titles.USERS_PASSWORD_RESET_RESULT_TITLE')}
                          doneLead={l('leads.RESET_PASSWORDS_RESULT')}
                          result={users
                            .reduce((data, user) => Object.assign(data, {
                              [user.displayName]: passwords[user.id]
                            }), {})
                          }
                          entities={users}
                          renderItem={(user) => user.displayName}
                          {...{
                            l,
                            active,
                            done,
                            spinning,
                            onClose,
                            onYes,
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
    users: state['userPassword.targets'],
    passwords: state['userPassword.result'],
    spinning: state['userPassword.busy'],
  }),
  ({
     userPasswordScene,
     userCheckScene
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
