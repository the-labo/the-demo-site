/**
 * UserDestroyDialog component
 */
'use strict'

import React from 'react'
import { TheConfirmDialog } from 'the-components'
import { asBound } from '../../wrappers'
import { withLoc } from 'the-loc'

const UserDestroyDialog = withLoc(
  function UserDestroyDialogImpl ({
                                    l,
                                    spinning,
                                    onClose,
                                    onSubmit,
                                    active,
                                    done
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
      userDestroyScene.doDestroy()
      userDestroyScene.set({done: true})
      userCheckScene.clear()
    }
  })
)
