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
import { SignScene, VerifyScene } from '../scenes'

class App extends React.Component {
  constructor (props) {
    super(props)
    const s = this
    s.signScene = new SignScene(props)
    s.verifyScene = new VerifyScene(props)
  }

  render () {
    const s = this
    const {props, notices} = s
    const {
      synced,
      user
    } = props

    return (
      <TheRoot className='app'>
        <Header {...{synced, user, notices}}/>
        <Toasts/>
        <Main>
          <Routes {...{user}}/>
        </Main>
        <Footer/>
      </TheRoot>
    )
  }

  componentDidMount () {
    const s = this
    const {signScene, verifyScene} = s

    ;(async () => {
      await signScene.syncSigned()
      await verifyScene.syncNeedsVerify({delay: 3 * 1000})
    })()
  }

  get notices () {
    const s = this
    const {verifyScene, props} = s
    const notices = {}
    const {needsVerify, l} = props
    if (needsVerify) {
      notices[l('messages.NEEDS_EMAIL_VERIFIED')] = {
        [l('buttons.DO_SEND_VERIFY')]: () => verifyScene.sendVerify()
      }
    }
    return notices
  }

}

const ConnectedApp = connect((state) => ({
  synced: state['sign.signed.synced'],
  user: state['sign.signed.user'],
  needsVerify: state['verify.needsVerify'],
}))(withClient(withStore(App)))

export default withProvider(
  withClient.root(
    withLoc.root(ConnectedApp, locales)
  )
)
