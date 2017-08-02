/**
 * SignupForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton, TheButtonGroup } from 'the-components'
import { asForm } from '../../wrappers'

const {Text, Password} = TheInput
const {Field, Label, Value} = TheForm

const SignupForm = ({
                      l,
                      getInputAttributesOf,
                      getLabelAttributesOf,
                      getFormAttributes,
                      getSubmitAttributes
                    }) => (
  <TheForm className='signup-form primary-form'
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

export default asForm(SignupForm)
