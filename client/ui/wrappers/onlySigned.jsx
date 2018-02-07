/**
 * Wrap to restrict access for only signed
 * @function onlySigned
 */
'use strict'

import React from 'react'
import { withStore, connect } from 'the-store'
import { withHistory, TheSpin } from 'the-components'
import { compose } from 'the-hoc'
import { get } from 'the-window'
import { Urls } from '@self/conf'

const debug = require('debug')('app:ui:onlySigned')

function onlySigned (Component, options = {}) {
  return compose(
    withHistory,
    withStore,
    connect((state) => ({
      hasSigned: Boolean(state['account.user']),
      signedReady: state['account.ready'],
    }))
  )(
    class OnlySigned extends React.Component {
      render () {
        const {props,} = this
        if (props.signedReady) {
          return <Component {...props}/>
        } else {
          return (
            <div>
              <TheSpin cover enabled size='xx-large'/>
            </div>)

        }
      }

      componentDidMount () {
        this.makeSureSigned()
      }

      componentDidUpdate () {
        this.makeSureSigned()
      }

      makeSureSigned () {
        const {hasSigned, history, signedReady, store,} = this.props
        if (!signedReady) {
          return
        }
        if (!hasSigned) {
          const {pathname,} = get('location')
          store.sign.up.back.set(pathname)
          store.sign.in.back.set(pathname)
          debug(`Ask sign in for: ${pathname}`)
          history.push(Urls.SIGN_ASK_URL)
        }
      }
    }
  )
}

export default onlySigned
