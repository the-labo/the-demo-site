/**
 * App component
 */
'use strict'

import React from 'react'
import { cycled, localized, stateful } from 'the-component-mixins'
import {
  TheMain,
  TheRoot,
} from 'the-components'
import { withBinder } from 'the-handle'
import { withProvider, withStore } from 'the-store'
import { locales } from '@self/conf'
import { CautionDisconnectedDialog } from './bounds'
import { Footer, Header, Toasts } from './layouts'
import Routes from './Routes'

@withProvider
@withBinder
@cycled
@localized.with(locales)
class App extends React.Component {
  render () {
    const {busy} = this.props
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
}

export default stateful(
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
)(App)
