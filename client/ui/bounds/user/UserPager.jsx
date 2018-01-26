/**
 * UserPager component
 */
'use strict'

import React from 'react'
import { withLoc } from 'the-loc'
import { compose, asBound } from 'the-hoc'
import { TheOperationPager } from 'the-site-components'

const UserPager = compose(
  withLoc
)(
  function UserPagerImpl ({
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
  UserPager,
  (state) => ({
    counts: state['userList.counts']
  }),
  ({
     userListScene
   }, propsProxy) => ({
    onPage: async ({pageNumber}) => {
      await userListScene.set({pageNumber})
      await userListScene.doSync()
    }
  })
)
