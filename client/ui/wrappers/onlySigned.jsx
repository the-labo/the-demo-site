/**
 * Wrap to restrict access for only signed
 * @function onlySigned
 */
'use strict'

import React from 'react'
import { wrapStack } from 'the-component-mixins/helpers'
import { TheSpin, withHistory } from 'the-components'
import { connect, withStore } from 'the-store'
import { get } from 'the-window'
import { Urls } from '@self/conf'

const debug = require('debug')('app:ui:onlySigned')

function onlySigned (Component) {
  @withHistory
  @withStore
  @connect((state) => ({
    hasSigned: Boolean(state['account.entity']),
    signedReady: state['account.ready'],
  }))
  class OnlySigned extends React.Component {
    componentDidMount () {
      this.makeSureSigned()
    }

    componentDidUpdate () {
      this.makeSureSigned()
    }

    makeSureSigned () {
      const {hasSigned, history, signedReady, store} = this.props
      if (!signedReady) {
        return
      }
      if (!hasSigned) {
        const {pathname} = get('location')
        store.sign.up.back.set(pathname)
        store.sign.in.back.set(pathname)
        debug(`Ask sign in for: ${pathname}`)
        history.push(Urls.SIGN_ASK_URL)
      }
    }

    render () {
      const {props} = this
      if (props.signedReady) {
        return <Component {...props}/>
      } else {
        return (
          <div>
            <TheSpin cover enabled size='xx-large'/>
          </div>
        )
      }
    }
  }

  OnlySigned.wrapStack = wrapStack(OnlySigned, Component)

  return OnlySigned
}

export default onlySigned
