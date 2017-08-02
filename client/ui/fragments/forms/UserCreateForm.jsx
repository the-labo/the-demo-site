/**
 * UserCreateForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton, TheButtonGroup } from 'the-components'
import { asForm } from '../../wrappers'
import { Types } from '@self/conf'

const {RoleType} = Types
const {Text, Password, Radio} = TheInput
const {Field, Label, Value} = TheForm

const UserCreateForm = ({
                          l,
                          getInputAttributesOf,
                          getLabelAttributesOf,
                          getFormAttributes,
                          getSubmitAttributes
                        }) => (
  <TheForm className='userCreateForm primaryForm'
           {...getFormAttributes()}
           required={['name']}
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
      <Label {...getLabelAttributesOf('role')}>
        {l('labels.USER_ROLE')}
      </Label>
      <Value>
        <Radio {...getInputAttributesOf('role')}
               options={{
                 [RoleType.ADMIN]: l('roles.ADMIN_ROLE'),
                 [RoleType.NORMAL]: l('roles.NORMAL_ROLE')
               }}
        />
      </Value>
    </Field>
    <Field>
      <TheButton wide primary {...getSubmitAttributes()}>
        {l('buttons.DO_CREATE')}
      </TheButton>
    </Field>
  </TheForm>
)

export default asForm(UserCreateForm)
