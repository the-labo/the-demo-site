/**
 * UserCreateForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton, TheButtonGroup } from 'the-components'
import { asForm, asBound } from '../../wrappers'
import { RoleCodes } from '@self/conf'

const {Text, Radio} = TheInput
const {Field, Label, Value} = TheForm

function UserCreateForm ({
                           l,
                           getInputAttributesOf,
                           getLabelAttributesOf,
                           getFormAttributes,
                           getSubmitAttributes
                         }) {
  return (
    <TheForm className='userCreateForm'
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
        <Label {...getLabelAttributesOf('role')}>
          {l('labels.USER_ROLE')}
        </Label>
        <Value>
          <Radio {...getInputAttributesOf('role')}
                 options={{
                   [RoleCodes.ADMIN_ROLE]: l('roleCodes.ADMIN_ROLE'),
                   [RoleCodes.NORMAL_ROLE]: l('roleCodes.NORMAL_ROLE')
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
}

export default asForm(
  UserCreateForm,
  (state) => ({
    spinning: state['userCreate.busy'],
    values: state['userCreate.entry'],
    errors: state['userCreate.entryErrors'],
  }),
  ({
     l,
     toastScene,
     userCreateScene,
     userListScene
   }) => ({
    onUpdate: (v) => userCreateScene.setEntry(v),
    onSubmit: async () => {
      await userCreateScene.doCreate()
      userCreateScene.set({done: true})
      toastScene.showInfo(l('toasts.USER_CREATE_DID_SUCCESS'))
      await userListScene.doSync()
    }
  })
)
