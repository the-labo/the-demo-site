/**
 * UserCreateDialog component
 */
'use strict'

import React from 'react'
import { withLoc } from 'the-loc'
import { TheDialog, TheInfo, TheOkDialog } from 'the-components'
import UserCreateForm from './UserCreateForm'
import { compose, asBound } from 'the-hoc'

const UserCreateDialog = compose(
  withLoc,
)(
  function UserCreateDialogImpl ({
                                   l,
                                   active,
                                   spinning,
                                   done,
                                   created,
                                   onClose
                                 }) {
    if (!active) {
      return null
    }
    if (done) {
      return (
        <TheOkDialog present
                     title={l('titles.USER_CREATE_RESULT_TITLE')}
                     hideCloseButton
                     {...{spinning, onClose}}
        >
          <TheInfo data={created && {
            [l('labels.USER_NAME')]: created.name,
            [l('labels.USER_PROFILE_NAME')]: created.profile?.name,
            [l('labels.USER_EMAIL')]: created.profile?.email,
            [l('labels.USER_PASSWORD')]: created.password
          }}
          />
        </TheOkDialog>
      )
    }
    return (
      <TheDialog
        present
        title={l('titles.USER_CREATE_INPUT_TITLE')}
        {...{spinning, onClose}}
      >
        <UserCreateForm/>
      </TheDialog>
    )
  }
)

export default asBound(
  UserCreateDialog,
  (state) => ({
    spinning: state['userCreate.busy'],
    active: state['userCreate.active'],
    done: state['userCreate.done'],
    created: state['userCreate.created']
  }),
  ({userCreateScene}, propsProxy) => ({
    onClose: () => userCreateScene.set({
      active: false,
      done: false
    })
  })
)
