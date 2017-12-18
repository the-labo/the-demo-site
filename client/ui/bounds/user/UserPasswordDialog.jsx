/**
 * UserPasswordDialog component
 */
'use strict'

import React from 'react'
import { compose, asBound, withLoc } from '../../wrappers'
import {
  TheOkDialog,
  TheYesNoDialog,
  TheCondition,
  TheInfo
} from 'the-components'
import { labelHelper } from '../../helpers'

const {labelForUser} = labelHelper

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
                [labelForUser(user)]: passwords[user.id]
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
              <li key={user.id}>{labelForUser(user)}</li>
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
    passwords: state['userPassword.results'],
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
