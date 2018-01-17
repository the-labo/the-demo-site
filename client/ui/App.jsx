/**
 * App component
 */
'use strict'

import React from 'react'
import {
  TheRoot,
  TheCondition
} from 'the-components'

import Header from './layouts/Header'
import Main from './layouts/Main'
import Toasts from './layouts/Toasts'
import Footer from './layouts/Footer'
import Routes from './Routes'
import { withProvider, withStore } from 'the-store'
import { withLoc, } from 'the-loc'
import { withCycle, asBound, } from 'the-hoc'
import { withBinder } from 'the-handle'
import { withClient } from 'the-client'
import { locales } from '@self/conf'
import { CautionDisconnectedDialog } from './bounds'

function App ({
                synced,
                user
              }) {
  return (
    <TheRoot>
      <Header/>
      <Toasts/>
      <Main>
        <TheCondition if={synced}>
          <Routes {...{user}}/>
        </TheCondition>
      </Main>
      <Footer/>
      <CautionDisconnectedDialog/>
    </TheRoot>
  )

}

const ConnectedApp = asBound(
  withCycle(withClient(withStore(App))),
  (state) => ({
    synced: state['account.synced'],
    user: state['account.user']
  }),
  ({
     appScene,
     accountScene,
     verifyNeedScene,
   }) => ({
    onMount: async () => {
      await appScene.busyFor(async () => {
        await accountScene.doSync()
      })
      await verifyNeedScene.doSync({delay: 3 * 1000})
    }
  })
)

export default withBinder(withProvider(
  withClient.root(
    withLoc.root(ConnectedApp, locales)
  )
))
