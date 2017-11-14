/**
 * UserList component
 */
'use strict'

import React from 'react'
import { Urls } from '@self/conf'
import { TheTable } from 'the-components'
import { withMoment, asPure, asBound } from '../../wrappers'
import UserListItem from './UserListItem'
import styles from './UserList.pcss'

const {Head, Body, Row, HeaderCell, SortableHeaderCell} = TheTable

const UserList = asPure(function UserListImpl ({
                                                 users,
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
            <UserListItem key={user.id}
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

export default asBound(
  UserList,
  (state) => ({}),
  ({}) => ({})
)
