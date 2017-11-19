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
import { asBound, withLoc } from './wrappers'
import { withBinder } from 'the-handle'
import { withClient } from 'the-client'
import { locales } from '@self/conf'

class App extends React.Component {
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
    const {props} = s
    props.onMount()
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
     accountScene,
     verifyScene,
     verifySendScene,
     toastScene
   }) => ({
    onMount: async () => {
      await accountScene.doSync()
      await verifyScene.doSync({delay: 3 * 1000})
    },
    onVerify: async () => {
      await verifySendScene.doSend()
      await verifyScene.doSync()
      toastScene.showInfo(l('toasts.VERIFY_EMAIL_SENT'))
    }
  })
)

export default withBinder(withProvider(
  withClient.root(
    withLoc.root(ConnectedApp, locales)
  )
))
