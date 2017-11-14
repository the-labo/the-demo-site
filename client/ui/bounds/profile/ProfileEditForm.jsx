/**
 * ProfileEditForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton } from 'the-components'
import { asForm, asBound } from '../../wrappers'

const {Text} = TheInput
const {Field, Label, Value} = TheForm

const ProfileEditForm = asForm(
  function ProfileEditFormImpl ({
                                  l,
                                  user,
                                  getInputAttributesOf,
                                  getLabelAttributesOf,
                                  getFormAttributes,
                                  getSubmitAttributes
                                }) {
    return (
      <TheForm className='profileForm'
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
                  pattern={Text.EMAIL_PATTERN}
                  patternWarning={l('warnings.SEEMS_INVALID_EMAIL')}
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
  })

export default asBound(
  ProfileEditForm,
  (state) => ({
    spinning: state['profile.edit.busy'],
    values: state['profile.edit.values'],
    errors: state['profile.edit.errors']
  }),
  ({
     l,
     profileEditScene,
     toastScene
   }) => ({
    onUpdate: (v) => profileEditScene.setEntryValues(v),
    onSubmit: async () => {
      await profileEditScene.doSave()
      toastScene.showInfo(l('toasts.PROFILE_UPDATE_DID_SUCCESS'))
    }
  })
)

