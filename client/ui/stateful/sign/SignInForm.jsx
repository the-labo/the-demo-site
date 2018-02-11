/**
 * SignInForm component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { withForm } from 'the-components'
import { TheSignInForm } from 'the-site-components'

@withForm
@localized
class SignInForm extends React.Component {
  render () {
    return (
      <TheSignInForm  {...this.props}/>
    )
  }
}

export default stateful(
  (state) => ({
    errors: state['sign.in.entryErrors'],
    spinning: state['sign.in.busy'],
    values: state['sign.in.entry'],
  }),
  ({
     accountScene,
     l,
     signInScene,
     toastScene,
   }) => ({
    onSubmit: async () => {
      await signInScene.doExec()
      await accountScene.doSync()
      toastScene.showInfo(l('toasts.SIGN_IN_DID_SUCCESS'))
      signInScene.goBack()
    },
    onUpdate: (v) => signInScene.setEntry(v),
  })
)(SignInForm)
