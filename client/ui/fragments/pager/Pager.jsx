/**
 * Pager component
 */
'use strict'

import React from 'react'
import { ThePager, TheCondition } from 'the-components'
import { compose, withLoc } from '../../wrappers'

const Pager = compose(
  withLoc
)(
  function PagerImpl ({
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

export default Pager