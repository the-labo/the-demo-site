/**
 * PasswordChangeForm component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { withForm } from 'the-components'
import { ThePasswordChangeForm } from 'the-site-components'

@withForm
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
    user: state['account.user'],
    values: state['password.change.entry'],
  }),
  ({
     l,
     passwordChangeScene,
     toastScene,
   }) => ({
    onSubmit: async () => {
      await passwordChangeScene.doSave()
      passwordChangeScene.set({done: true})
      toastScene.showInfo(l('toasts.PASSWORD_UPDATE_DID_SUCCESS'))
    },
    onUpdate: (v) => passwordChangeScene.setEntry(v),
  })
)(PasswordChangeForm)
