/**
 * UserPasswordDialog component
 */
'use strict'

import React from 'react'
import { withLoc } from 'the-loc'
import { compose, asBound, } from 'the-hoc'
import {
  TheOkDialog,
  TheYesNoDialog,
  TheInfo,
} from 'the-components'

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
                                     onYes
                                   }) {
    if (!active) {
      return null
    }
    if (done) {
      return (
        <TheOkDialog
          present
          title={l('titles.USERS_PASSWORD_RESET_RESULT_TITLE')}
          lead={l('leads.RESET_PASSWORDS_RESULT')}
          hideCloseButton
          onClose={onClose}
        >
          <TheInfo data={
            users
              .reduce((data, user) => Object.assign(data, {
                [user.displayName]: passwords[user.id]
              }), {})
          }
          />
        </TheOkDialog>
      )
    }
    return (
      <TheYesNoDialog present
                      title={l('titles.USERS_PASSWORD_RESET_CONFIRM_TITLE')}
                      yesText={l('buttons.DO_EXECUTE')}
                      noText={l('buttons.DO_CANCEL')}
                      lead={l('leads.RESET_PASSWORDS_CONFIRM')}
                      spinning={spinning}
                      onNo={onClose}
                      onClose={onClose}
                      onYes={onYes}
      >
        <ul>
          {
            users.map((user) => (
              <li key={user.id}>{user.displayName}</li>
            ))
          }
        </ul>
      </TheYesNoDialog>
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
