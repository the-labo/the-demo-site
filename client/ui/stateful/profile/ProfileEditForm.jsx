/**
 * ProfileEditForm component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { formed } from 'the-component-mixins'
import { TheProfileEditForm } from 'the-site-components'

@formed
@localized
class ProfileEditForm extends React.Component {
  render () {
    return (
      <TheProfileEditForm {...this.props}/>
    )
  }
}

export default stateful(
  (state) => ({
    errors: state['profile.edit.entryErrors'],
    spinning: state['profile.edit.busy'],
    values: state['profile.edit.entry'],
  }),
  ({
     accountScene,
     l,
     profileEditScene: editScene,
     toastScene,
   }) => ({
    onSubmit: async () => {
      await editScene.doExec()
      editScene.set({done: true})
      await accountScene.doSync()
      toastScene.showInfo(l('toasts.PROFILE_UPDATE_DID_SUCCESS'))
    },
    onUpdate: (v) => editScene.setEntry(v),
  })
)(ProfileEditForm)
