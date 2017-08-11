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
import { SignScene } from '../scenes'

class App extends React.Component {
  constructor (props) {
    super(props)
    const s = this
    s.signScene = new SignScene(props)
  }

  render () {
    const s = this
    const {props} = s
    const {
      synced,
      user
    } = props
    return (
      <TheRoot className='app'>
        <Header {...{synced, user}}/>
        <Toasts/>
        <Main>
          <Routes/>
        </Main>
        <Footer/>
      </TheRoot>
    )
  }

  componentDidMount () {
    const s = this
    const {signScene} = s

    ;(async () => {
      await signScene.syncSigned()
    })()
  }

}

const ConnectedApp = connect((state) => ({
  synced: state['sign.signed.synced'],
  user: state['sign.signed.user']
}))(withClient(withStore(App)))

export default withProvider(
  withClient.root(
    withLoc.root(ConnectedApp, locales)
  )
)
