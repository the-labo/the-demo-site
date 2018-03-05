/**
 * PasswordChangeForm component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { formed } from 'the-component-mixins'
import { ThePasswordChangeForm } from 'the-site-components'

@formed
@localized
class PasswordChangeForm extends React.Component {
  render () {
    return (
      <ThePasswordChangeForm {...this.props}>
      </ThePasswordChangeForm>
    )
  }
}

export default stateful(
  (state) => ({
    errors: state['password.change.entryErrors'],
    spinning: state['password.change.busy'],
    user: state['account.entity'],
    values: state['password.change.entry'],
  }),
  ({
     l,
     passwordChangeScene: changeScene,
     toastScene,
   }) => ({
    onSubmit: async () => {
      await changeScene.doExec()
      changeScene.set({done: true})
      toastScene.showInfo(l('toasts.PASSWORD_UPDATE_DID_SUCCESS'))
    },
    onUpdate: (v) => changeScene.setEntry(v),
  })
)(PasswordChangeForm)
