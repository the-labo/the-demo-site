/**
 * AdminUserPager component
 */
'use strict'

import React from 'react'
import { localized } from 'the-component-mixins'
import { asBound, compose } from 'the-hoc'
import { TheOperationPager } from 'the-site-components'

const AdminUserPager = compose(
  localized
)(
  function AdminUserPagerImpl ({
                            counts,
                            l,
                            onPage,
                            showCounts,
                          }) {
    return (
      <TheOperationPager {...{counts, l, onPage, showCounts}}/>
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
    onPage: async ({pageNumber}) => {
      await adminUserListScene.set({pageNumber})
      await adminUserListScene.doSync()
    },
  })
)
