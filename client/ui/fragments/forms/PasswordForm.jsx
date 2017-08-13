/**
 * PasswordForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton } from 'the-components'
import { asForm } from '../../wrappers'

const {Password} = TheInput
const {Field, Label, Value} = TheForm

const PasswordForm = ({
                        l,
                        user,
                        getInputAttributesOf,
                        getLabelAttributesOf,
                        getFormAttributes,
                        getSubmitAttributes
                      }) => (
  <TheForm className='password-form'
           {...getFormAttributes()}
           required={['name']}
  >
    <Field>
      <Label>
        {l('labels.USER_NAME')}
      </Label>
      <Value>
        {user.name}
      </Value>
    </Field>
    <Field>
      <Label {...getLabelAttributesOf('password')}>
        {l('labels.NEW_PASSWORD')}
      </Label>
      <Value>
        <Password placeholder={l('placeholders.NEW_PASSWORD')}
                  autoFocus
                  {...getInputAttributesOf('password')}/>
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

export default asForm(PasswordForm)
