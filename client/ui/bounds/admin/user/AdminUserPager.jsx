/**
 * AdminUserPager component
 */
'use strict'

import React from 'react'
import { withLoc } from 'the-loc'
import { compose, asBound } from 'the-hoc'
import { TheOperationPager } from 'the-site-components'

const AdminUserPager = compose(
  withLoc
)(
  function AdminUserPagerImpl ({
                            counts,
                            l,
                            onPage,
                            showCounts,
                          }) {
    return (
      <TheOperationPager {...{counts, l, onPage, showCounts,}}/>
    )
  }
)

export default asBound(
  AdminUserPager,
  (state) => ({
    counts: state['admin.user.list.counts'],
  }),
  ({
     adminUserListScene,
   }, propsProxy) => ({
    onPage: async ({pageNumber,}) => {
      await adminUserListScene.set({pageNumber,})
      await adminUserListScene.doSync()
    },
  })
)
