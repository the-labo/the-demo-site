/**
 * SigninForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton } from 'the-components'
import { asForm } from '../../wrappers'

const {Text, Password} = TheInput
const {Field, Label, Value} = TheForm

const SigninForm = ({
                      getInputAttributesOf,
                      getLabelAttributesOf,
                      getFormAttributes,
                      getSubmitAttributes,
                      onSubmit,
                      l
                    }) => (
  <TheForm className='signinForm primaryForm'
           {...getFormAttributes()}
  >
    <TheInput {...getInputAttributesOf('@')}
              onUpdate={() => null}
              type='hidden'/>
    <Field>
      <Label {...getLabelAttributesOf('name')}>
        {l('labels.USER_NAME')}
      </Label>
      <Value>
        <Text placeholder={l('placeholders.USER_NAME')}
              {...getInputAttributesOf('name')}
        />
      </Value>
    </Field>
    <Field>
      <Label {...getLabelAttributesOf('password')}>
        {l('labels.USER_PASSWORD')}
      </Label>
      <Value>
        <Password {...getInputAttributesOf('password')}
                  onEnter={onSubmit}
        />
      </Value>
    </Field>
    <Field>
      <TheButton wide primary {...getSubmitAttributes()}>
        {l('buttons.DO_SIGNIN')}
      </TheButton>
    </Field>
  </TheForm>
)

export default asForm(SigninForm)
