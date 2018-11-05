/**
 * AdminUserPager component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { TheOperationPager } from 'the-site-components'

@stateful(
  (state) => ({
    counts: state['admin.user.list.counts'],
  }),
  ({
     adminUserListScene: listScene,
   }, propsProxy) => ({
    onPage: async ({pageNumber}) => {
      await listScene.set({pageNumber})
      await listScene.doSync()
    },
  })
)
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
      <TheOperationPager {...{ counts, l, onPage, showCounts }}
      />
    )
  }
}

export default AdminUserPager
