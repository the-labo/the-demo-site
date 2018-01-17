/**
 * UserList component
 */
'use strict'

import React from 'react'
import c from 'classnames'
import { TheTable } from 'the-components'
import { withLoc } from 'the-loc'
import { asPure, compose, asBound, } from 'the-hoc'
import UserListItem from './UserListItem'
import styles from './UserList.pcss'

const {Head, Body, Row, HeaderCell, SortableHeaderCell} = TheTable

const UserList = compose(
  withLoc,
  asPure
)(function UserListImpl ({
                           users,
                           className,
                           l,
                           sort,
                           onSort
                         }) {
  return (
    <div className={c('user-list', className)}>
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
  (state) => ({
    users: state['userList.entities'],
    sort: state['userList.sort']
  }),
  ({userListScene}) => ({
    onSort: async (name) => {
      userListScene.setSort(name)
      await userListScene.doSync()
    }
  })
)
