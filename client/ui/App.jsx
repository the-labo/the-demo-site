/**
 * App component
 */
'use strict'

import React from 'react'
import { withClient } from 'the-client'
import {
  TheMain,
  TheRoot,
} from 'the-components'
import { withBinder } from 'the-handle'
import { asBound, withCycle } from 'the-hoc'
import { withLoc } from 'the-loc'
import { withProvider, withStore } from 'the-store'
import { locales } from '@self/conf'
import { CautionDisconnectedDialog } from './bounds'
import { Footer, Header, Toasts } from './layouts'
import Routes from './Routes'

function App ({busy}) {
  return (
    <TheRoot>
      <Header/>
      <Toasts/>
      <TheMain spinning={busy}>
        <Routes/>
      </TheMain>
      <Footer/>
      <CautionDisconnectedDialog/>
    </TheRoot>
  )

}

const ConnectedApp = asBound(
  withCycle(withClient(withStore(App))),
  (state) => ({
    busy: state['app.busy'],
  }),
  ({
     accountScene,
     appScene,
     verifyNeedScene,
   }) => ({
    onMount: async () => {
      await accountScene.doSync()
      await verifyNeedScene.doSync({delay: 3 * 1000})
    },
  })
)

export default withBinder(withProvider(
  withClient.root(
    withLoc.root(ConnectedApp, locales)
  )
))
