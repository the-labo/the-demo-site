/**
 * UserDestroyDialog component
 */
'use strict'

import React from 'react'
import { TheConfirmDialog, } from 'the-components'
import { withLoc, compose, asBound } from '../../wrappers'

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
            <li key={user.id}>{user.displayName}</li>
          ))}
        </ul>
      </TheConfirmDialog>
    )
  }
)

export default asBound(
  UserDestroyDialog,
  (state) => ({
    spinning: state['userDestroy.busy'],
    active: state['userDestroy.active'],
    done: state['userDestroy.done'],
    users: state['userDestroy.targets'],
  }),
  ({
     l,
     userDestroyScene,
     userCheckScene,
     userListScene,
     toastScene
   }, propsProxy) => ({
    onClose: () => userDestroyScene.set({
      done: false,
      active: false
    }),
    onSubmit: async () => {
      await userDestroyScene.doDestroy()
      userDestroyScene.set({
        done: true,
        active: false
      })
      userCheckScene.init()
      toastScene.showInfo(l('toasts.USER_DESTROY_DID_SUCCESS'))
      await userListScene.doSync()
    }
  })
)
