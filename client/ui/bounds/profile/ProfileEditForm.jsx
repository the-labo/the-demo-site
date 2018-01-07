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
    spinning: state['profileEdit.busy'],
    values: state['profileEdit.entry'],
    errors: state['profileEdit.entryErrors']
  }),
  ({
     l,
     profileEditScene,
     toastScene,
     accountScene
   }) => ({
    onUpdate: (v) => profileEditScene.setEntry(v),
    onSubmit: async () => {
      await profileEditScene.doSave()
      profileEditScene.set({done: true})
      await accountScene.doSync()
      toastScene.showInfo(l('toasts.PROFILE_UPDATE_DID_SUCCESS'))
    }
  })
)

