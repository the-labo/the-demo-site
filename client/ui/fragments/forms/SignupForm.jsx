/**
 * SignupForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton, TheButtonGroup } from 'the-components'
import { asForm, asBound } from '../../wrappers'

const {Text, Password} = TheInput
const {Field, Label, Value} = TheForm

const SignupForm = asForm(
  function SignupFormImpl ({
                             l,
                             getInputAttributesOf,
                             getLabelAttributesOf,
                             getFormAttributes,
                             getSubmitAttributes
                           }) {
    return (
      <TheForm className='signup-form'
               {...getFormAttributes()}
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
  })

export default asBound(
  SignupForm,
  (state) => ({
    spinning: state['auth.signup.busy'],
    values: state['auth.signup.entry.values'],
    errors: state['auth.signup.entry.errors'],
  }),
  ({
     l,
     authScene,
     signupScene,
     toastScene
   }) => ({
    onUpdate: (v) => signupScene.setEntryValues(v),
    onSubmit: async () => {
      await signupScene.doSignup()
      await authScene.syncUser()
      toastScene.showInfo(l('toasts.SIGNUP_DID_SUCCESS'))
      signupScene.putBack()
    }
  })
)
