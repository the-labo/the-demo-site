/**
 * UserPager component
 */
'use strict'

import React from 'react'
import { ThePager, TheCondition } from 'the-components'
import { compose, asBound, withLoc } from '../../wrappers'

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
      <ThePager.Row>
        <ThePager.ByCounts counts={counts}
                           onUpdate={onPage}
        />
        <TheCondition if={showCounts}>
          <ThePager.Counts {...{l, counts}}/>
        </TheCondition>
      </ThePager.Row>
    )
  }
)

export default asBound(
  UserPager,
  (state) => ({
    counts: state['user.list.counts']
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
