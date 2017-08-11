/**
 * Pager component
 */
'use strict'

import React from 'react'
import { ThePager } from 'the-components'
import { asPure } from '../../wrappers'
import { metaToPage } from 'clay-list-pager'

import styles from './Pager.pcss'

const Pager = asPure(
  function Pager ({ counts, onChange }) {
    if (!counts) {
      return null
    }
    let { number, total } = metaToPage(counts)
    if (typeof total === 'undefined') {
      return null
    }
    if (total === 0) {
      return null
    }
    return (
      <ThePager className='pager'
                size={5}
                page={number - 1}
                total={total}
                onChange={({ page }) => onChange({ pageNumber: page + 1 })}
      >
      </ThePager>
    )
  }
)

Pager.Row = ({ children }) => (
  <div className={styles.row}>
    {children}
  </div>
)

Pager.Counter = ({ l, counts }) => {
  if (!counts) {
    return null
  }
  let { limit, offset, total } = counts
  if (typeof total === 'undefined') {
    return null
  }
  if (total === 0) {
    return null
  }
  return (
    <div className={styles.counter}>
      {l('labels.COUNTER', {
        from: offset + 1,
        to: Math.min(offset + limit, total),
        of: total
      })}
    </div>
  )
}

export default Pager
