/**
 * UserList component
 */
'use strict'

import React from 'react'
import { TheTable, TheCondition } from 'the-components'
import { withMoment } from '../../wrappers'
import { asPure, asBound } from 'the-hoc'

const {Row, Cell, CheckboxCell} = TheTable

const UserListItem = withMoment(
  asPure(function UserListItemImpl ({
                                      formatDate,
                                      user,
                                      checkValue,
                                      onUpdateCheck
                                    }) {
    const {profile, sign} = user
    const freezed = String(user.id) === 'superadmin'
    return (
      <Row selected={checkValue}>
        <TheCondition if={freezed}>
          <Cell/>
        </TheCondition>
        <TheCondition unless={freezed}>
          <CheckboxCell
            name={user.id}
            value={checkValue}
            onUpdate={onUpdateCheck}
          />
        </TheCondition>
        <Cell>{user.name}</Cell>
        <Cell>{profile?.name}</Cell>
        <Cell>{profile?.email}</Cell>
        <Cell>{sign && formatDate(sign.signInAt, 'lll')}</Cell>
      </Row>
    )
  })
)

export default asBound(
  UserListItem,
  (state, props) => ({
    checkValue: (state['userCheck.values'] || {})[props.user.id]
  }),
  ({
     userCheckScene
   }, propsProxy) => ({
    onUpdateCheck: (v) => userCheckScene.setValues(v)
  })
)
