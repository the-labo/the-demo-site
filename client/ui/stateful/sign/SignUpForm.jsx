/**
 * SignUpForm component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { withForm } from 'the-components'
import { TheSignUpForm } from 'the-site-components'

@withForm
@localized
class SignUpForm extends React.Component {
  render () {
    return (
      <TheSignUpForm {...this.props}/>
    )
  }
}

export default stateful(
  (state) => ({
    errors: state['sign.up.entryErrors'],
    spinning: state['sign.up.busy'],
    step: state['sign.up.step'],
    values: state['sign.up.entry'],
  }),
  ({
     accountScene,
     l,
     signUpScene: upScene,
     toastScene,
   }, ownProps) => ({
    onStep: (step) => {
      upScene.setStep(step)
    },
    onSubmit: async () => {
      await upScene.doExec()
      await accountScene.doSync()
      toastScene.showInfo(l('toasts.SIGN_UP_DID_SUCCESS'))
      upScene.goBack()
    },
    onUpdate: (v) => upScene.setEntry(v),
  })
)(SignUpForm)
