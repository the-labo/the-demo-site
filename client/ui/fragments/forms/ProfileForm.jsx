/**
 * ProfileForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton } from 'the-components'
import { asForm } from '../../wrappers'

const {Text} = TheInput
const {Field, Label, Value} = TheForm

const ProfileForm = ({
                       l,
                       user,
                       getInputAttributesOf,
                       getLabelAttributesOf,
                       getFormAttributes,
                       getSubmitAttributes
                     }) => (
  <TheForm className='profileForm primaryForm'
           {...getFormAttributes()}
           required={['name']}
  >
    <Field>
      <Label>
        {l('labels.USER_NAME')}
      </Label>
      <Value>
        {user && user.name}
      </Value>
    </Field>
    <Field>
      <Label {...getLabelAttributesOf('name')}>
        {l('labels.USER_PROFILE_NAME')}
      </Label>
      <Value>
        <Text placeholder={l('placeholders.USER_PROFILE_NAME')}
              autoFocus
              {...getInputAttributesOf('name')}/>
      </Value>
    </Field>
    <Field>
      <Label {...getLabelAttributesOf('email')}>
        {l('labels.USER_EMAIL')}
      </Label>
      <Value>
        <Text placeholder={l('placeholders.USER_EMAIL')}
              type='email'
              {...getInputAttributesOf('email')}/>
      </Value>
    </Field>
    <br/>
    <Field>
      <TheButton wide primary {...getSubmitAttributes()}>
        {l('buttons.DO_UPDATE')}
      </TheButton>
    </Field>
  </TheForm>
)

export default asForm(ProfileForm)
