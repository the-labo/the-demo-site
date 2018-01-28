/**
 * ProfileEditForm component
 */
'use strict'

import React from 'react'
import { TheProfileEditForm } from 'the-site-components'
import { asForm } from '../../wrappers'

function ProfileEditForm (props) {
  return (
    <TheProfileEditForm {...props}/>
  )
}

export default asForm(
  ProfileEditForm,
  (state) => ({
    errors: state['profile.edit.entryErrors'],
    spinning: state['profile.edit.busy'],
    values: state['profile.edit.entry'],
  }),
  ({
     accountScene,
     l,
     profileEditScene,
     toastScene,
   }) => ({
    onSubmit: async () => {
      await profileEditScene.doSave()
      profileEditScene.set({done: true})
      await accountScene.doSync()
      toastScene.showInfo(l('toasts.PROFILE_UPDATE_DID_SUCCESS'))
    },
    onUpdate: (v) => profileEditScene.setEntry(v),
  })
)
