/**
 * UserDestroyDialog component
 */
'use strict'

import React from 'react'
import { TheConfirmDialog, } from 'the-components'
import { withLoc, compose, asBound } from '../../wrappers'
import { labelHelper } from '../../helpers'

const {displayNameForUser} = labelHelper

const UserDestroyDialog = compose(
  withLoc
)(
  function UserDestroyDialogImpl ({
                                    l,
                                    spinning,
                                    onClose,
                                    onSubmit,
                                    active,
                                    done,
                                    users
                                  }) {
    if (!active) {
      return null
    }
    if (done) {

    }
    return (
      <TheConfirmDialog present
                        title={l('titles.USERS_DESTROY_CONFIRM_TITLE')}
                        checkText={l('checks.SURE_TO_DESTROY')}
                        submitText={l('buttons.DO_DESTROY')}
                        lead={l('leads.USER_DESTROY_CONFIRM')}
                        {...{
                          onClose,
                          onSubmit,
                          spinning
                        }}
      >
        <ul>
          {users.map((user) => (
            <li key={user.id}>{displayNameForUser(user)}</li>
          ))}
        </ul>
      </TheConfirmDialog>
    )
  }
)

export default asBound(
  UserDestroyDialog,
  (state) => ({
    spinning: state['user.destroy.busy'],
    active: state['user.destroy.active'],
    done: state['user.destroy.done'],
  }),
  ({
     userDestroyScene,
     userCheckScene
   }, propsProxy) => ({
    onClose: () => userDestroyScene.clear(),
    onSubmit: async () => {
      await userDestroyScene.doDestroy()
      userDestroyScene.set({done: true})
      userCheckScene.clear()

    }
  })
)
