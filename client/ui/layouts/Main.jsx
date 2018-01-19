/**
 * Main component
 */
'use strict'

import React from 'react'
import { TheMain, TheSpin } from 'the-components'
import { asBound } from 'the-hoc'

const Main = function MainImpl ({busy, children}) {
  return (
    <TheMain>
      <TheSpin enabled={busy} cover/>
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
