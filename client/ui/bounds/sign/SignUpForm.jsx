/**
 * SignUpForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton, TheButtonGroup } from 'the-components'
import { asForm } from '../../wrappers'

const {Text, Password} = TheInput
const {Field, Label, Value} = TheForm

function SignUpForm ({
                       l,
                       getInputAttributesOf,
                       getLabelAttributesOf,
                       getFormAttributes,
                       getSubmitAttributes
                     }) {
  return (
    <TheForm {...getFormAttributes()}
             required={['name', 'password']}
             autoComplete='off'
    >
      <Field>
        <Label {...getLabelAttributesOf('name')}>
          {l('labels.USER_NAME')}
        </Label>
        <Value>
          <Text placeholder={l('placeholders.USER_NAME')}
                autoFocus
                {...getInputAttributesOf('name')}/>
        </Value>
      </Field>
      <Field>
        <Label {...getLabelAttributesOf('profile.name')}>
          {l('labels.USER_PROFILE_NAME')}
        </Label>
        <Value>
          <Text placeholder={l('placeholders.USER_PROFILE_NAME')}
                {...getInputAttributesOf('profile.name')}/>
        </Value>
      </Field>
      <Field>
        <Label {...getLabelAttributesOf('profile.email')}>
          {l('labels.USER_EMAIL')}
        </Label>
        <Value>
          <Text placeholder={l('placeholders.USER_EMAIL')}
                type='email'
                {...getInputAttributesOf('profile.email')}/>
        </Value>
      </Field>
      <Field>
        <Label {...getLabelAttributesOf('password')}>
          {l('labels.USER_PASSWORD')}
        </Label>
        <Value>
          <Password {...getInputAttributesOf('password')}
          />
        </Value>
      </Field>
      <Field>
        <TheButton wide primary {...getSubmitAttributes()}>
          {l('buttons.DO_SIGNUP')}
        </TheButton>
      </Field>
    </TheForm>
  )
}

export default asForm(
  SignUpForm,
  (state) => ({
    spinning: state['signUp.busy'],
    values: state['signUp.entry'],
    errors: state['signUp.entryErrors'],
  }),
  ({
     l,
     accountScene,
     signUpScene,
     toastScene
   }) => ({
    onUpdate: (v) => signUpScene.setEntry(v),
    onSubmit: async () => {
      await signUpScene.doSignUp()
      await accountScene.doSync()
      toastScene.showInfo(l('toasts.SIGNUP_DID_SUCCESS'))
      signUpScene.goBack()
    }
  })
)
