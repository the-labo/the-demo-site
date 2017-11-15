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
import { asBound } from './wrappers'
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
    } = s.props

    return (
      <TheRoot className='app'>
        <Header {...{synced, user, notices}}/>
        <Toasts/>
        <Main>
          <TheCondition if={synced}>
            <Routes {...{user}}/>
          </TheCondition>
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
    const {onVerify} = s.props
    const notices = {}
    const {needsVerify, user, l} = s.props
    if (user && needsVerify) {
      notices[l('messages.NEEDS_EMAIL_VERIFIED')] = {
        [l('buttons.DO_SEND_VERIFY')]: onVerify
      }
    }
    return notices
  }

}

const ConnectedApp = asBound(
  withClient(withStore(App)),
  (state) => ({
    synced: state['account.synced'],
    user: state['account.user'],
    needsVerify: state['verify.needsVerify'],
  }),
  ({
     l,
     verifyScene,
     toastScene
   }) => ({
    onVerify: async () => {
      await verifyScene.doSend()
      toastScene.showInfo(l('toasts.VERIFY_EMAIL_SENT'))
    }
  })
)

export default withProvider(
  withClient.root(
    withLoc.root(ConnectedApp, locales)
  )
)
