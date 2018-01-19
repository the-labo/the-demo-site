/**
 * Main component
 */
'use strict'

import React from 'react'
import { TheMain } from 'the-components'
import { asBound } from 'the-hoc'

const Main = function MainImpl ({busy, children}) {
  return (
    <TheMain spinning={busy}>
      {children}
    </TheMain>
  )
}

export default asBound(
  Main,
  (state) => ({
    busy: state['app.busy'],
  })
)
