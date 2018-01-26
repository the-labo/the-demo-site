/**
 * SignUpForm component
 */
'use strict'

import React from 'react'
import { TheSignUpForm } from 'the-site-components'
import { asForm } from '../../wrappers'

function SignUpForm (props) {
  return (
    <TheSignUpForm {...props}
    >
    </TheSignUpForm>
  )
}

export default asForm(
  SignUpForm,
  (state) => ({
    errors: state['signUp.entryErrors'],
    spinning: state['signUp.busy'],
    step: state['signUp.step'],
    values: state['signUp.entry'],
  }),
  ({
     accountScene,
     l,
     signUpScene,
     toastScene,
   }, ownProps) => ({
    onStep: (step) => {
      signUpScene.setStep(step)
    },
    onSubmit: async () => {
      await signUpScene.doSignUp()
      await accountScene.doSync()
      toastScene.showInfo(l('toasts.SIGNUP_DID_SUCCESS'))
      signUpScene.goBack()
    },
    onUpdate: (v) => signUpScene.setEntry(v),
  })
)
