/**
 * UserPasswordDialog component
 */
'use strict'

import React from 'react'
import { compose, asBound, withLoc } from '../../wrappers'
import { TheOkDialog, TheYesNoDialog, TheCondition } from 'the-components'
import { labelHelper } from '../../helpers'

const {displayNameForUser} = labelHelper

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
        <TheYesNoDialog present
                        className='admin-password-reset-confirm-dialog'
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
                <li key={user.id}>{displayNameForUser(user)}</li>
              ))
            }
          </ul>
        </TheYesNoDialog>
      )
    }
    return (
      <TheOkDialog
        present
        className='admin-password-reset-result-dialog'
        title={l('titles.USERS_PASSWORD_RESET_RESULT_TITLE')}
        lead={l('leads.RESET_PASSWORDS_RESULT')}
        hideCloseButton
        onClose={onClose}
      >
        <TheInfo data={
          users
            .reduce((data, user) => Object.assign(data, {
              [displayNameForUser(user)]: passwords[user.id]
            }), {})
        }
        />
      </TheOkDialog>
    )
  }
)

export default asBound(
  UserPasswordDialog,
  (state) => ({
    active: state['user.password.active'],
    done: state['user.password.done'],
    users: state['user.password.targets'],
    passwords: state['user.password.results'],
    spinning: state['user.password.busy'],
  }),
  ({userPasswordScene}, propsProxy) => ({
    onClose: () => userPasswordScene.set({active: false}),
    onYes: async () => {
      await userPasswordScene.doReset()
      userPasswordScene.set({done: true})
    }
  })
)
