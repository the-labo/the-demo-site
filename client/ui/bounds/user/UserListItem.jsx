/**
 * UserList component
 */
'use strict'

import React from 'react'
import { Urls } from '@self/conf'
import { TheTable } from 'the-components'
import { withMoment, asPure, asBound } from '../../wrappers'
import styles from './UserList.pcss'

const {Row, Cell, CheckboxCell} = TheTable

const UserListItem = withMoment(
  asPure(function UserListItemImpl ({
                                      formatDate,
                                      user,
                                      checkValue,
                                      onUpdateCheck
                                    }) {
    const {profile} = user
    return (
      <Row selected={checkValue}>
        <CheckboxCell
          name={user.id}
          value={checkValue}
          onUpdate={onUpdateCheck}
        />
        <Cell>{user.name}</Cell>
        <Cell>{profile && profile.name}</Cell>
        <Cell>{profile && profile.email}</Cell>
        <Cell>{formatDate(user.signinAt, 'lll')}</Cell>
      </Row>
    )
  })
)

export default asBound(
  UserListItem,
  (state, props) => ({
    checkValue: state['user.check.checked'][props.user.id]
  }),
  ({
     userChecksScene
   }, propsProxy) => ({
    onUpdateCheck: (v) => userChecksScene.setValues(v)
  })
)
