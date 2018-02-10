/**
 * ProfileEditForm component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { withForm } from 'the-components'
import { TheProfileEditForm } from 'the-site-components'

@withForm
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
)(ProfileEditForm)
