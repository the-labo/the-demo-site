/**
 * UserPager component
 */
'use strict'

import React from 'react'
import { ThePager, TheCondition } from 'the-components'
import { compose, asBound, withLoc } from '../../wrappers'
import { Pager } from '../../fragments'

const UserPager = compose(
  withLoc
)(
  function UserPagerImpl ({
                            l,
                            showCounts,
                            counts,
                            onPage
                          }) {
    return (
      <Pager {...{l, showCounts, counts, onPage}}/>
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
