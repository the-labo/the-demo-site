/**
 * AdminUserList component
 */
'use strict'

import React from 'react'
import { Urls } from '@self/conf'
import { TheTable } from 'the-components'
import { withMoment, asPure } from '../../wrappers'
import styles from './AdminUserList.pcss'

const {Head, Body, Row, Cell, HeaderCell, CheckboxCell, SortableHeaderCell} = TheTable

const AdminUserList = withMoment(
  asPure(function AdminUserList ({
                                   users,
                                   formatDate,
                                   l,
                                   sort,
                                   onSort,
                                   onUpdateCheck,
                                   checks = {}
                                 }) {
    return (
      <div className='user-list'>
        <TheTable className={styles.table}
                  empty={users && users.length === 0}
                  alt={l('alt.LIST_EMPTY')}
        >
          <Head>
            <Row>
              <HeaderCell/>
              <SortableHeaderCell name='name'
                                  {...{sort, onSort}}
              >{l('labels.USER_NAME')}</SortableHeaderCell>
              <HeaderCell>{l('labels.USER_PROFILE_NAME')}</HeaderCell>
              <HeaderCell>{l('labels.USER_EMAIL')}</HeaderCell>
              <SortableHeaderCell name='signinAt'
                                  {...{sort, onSort}}
              >{l('labels.USER_SIGNIN_AT')}</SortableHeaderCell>
            </Row>
          </Head>
          <Body>
          {
            users.map((user) => (
              <AdminUserListItem key={user.id}
                                 user={user}
                                 checkValue={checks[user.id]}
                                 onUpdateCheck={onUpdateCheck}
              />
            ))
          }
          </Body>
        </TheTable>
      </div>
    )
  })
)

const AdminUserListItem = withMoment(
  asPure(function AdminUserListItem ({
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

Object.assign(AdminUserList, {
  Item: AdminUserListItem
})

export default AdminUserList
