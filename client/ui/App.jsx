/**
 * App component
 */
'use strict'

import React from 'react'
import {
  TheRoot
} from 'the-components'

import Header from './layouts/Header'
import Main from './layouts/Main'
import Toasts from './layouts/Toasts'
import Footer from './layouts/Footer'
import Routes from './Routes'
import { withProvider, connect, withStore } from 'the-store'
import { withClient } from 'the-client'
import { withLoc } from 'the-loc'
import { locales } from '@self/conf'

class App extends React.Component {
  constructor (props) {
    super(props)
    const s = this
  }

  render () {
    const s = this
    const { props } = s
    const { user } = props
    return (
      <TheRoot className='app'>
        <Header {...{user}}/>
        <Toasts />
        <Main>
          <Routes />
        </Main>
        <Footer />
      </TheRoot>
    )
  }

}

const ConnectedApp = connect((state) => ({

}))(withClient(withStore(App)))

export default withProvider(
  withClient.root(
    withLoc.root(ConnectedApp, locales)
  )
)
