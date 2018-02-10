/**
 * AdminUserPager component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { TheOperationPager } from 'the-site-components'

@localized
class AdminUserPager extends React.Component {
  render () {
    const {
      counts,
      l,
      onPage,
      showCounts,
    } = this.props

    return (
      <TheOperationPager {...{counts, l, onPage, showCounts}}/>
    )
  }
}

export default stateful(
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
)(AdminUserPager)
