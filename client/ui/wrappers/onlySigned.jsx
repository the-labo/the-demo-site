/**
 * Wrap to restrict access for only signed
 * @function onlySigned
 */
'use strict'

import React from 'react'
import { withStore } from 'the-store'
import { withHistory } from 'the-components'
import { get } from 'the-window'
import { Urls } from '@self/conf'

const debug = require('debug')('app:ui:onlySigned')

function onlySigned (Component, options = {}) {

  return withHistory(
    withStore(
      class OnlySigned extends React.Component {
        render () {
          return <Component {...this.props}/>
        }

        componentDidMount () {
          this.makeSureSigned()
        }

        componentDidUpdate () {
          this.makeSureSigned()
        }

        makeSureSigned () {
          const {store, history} = this.props
          const synced = store.account.get('synced')
          if (synced) {
            const user = store.account.get('user')
            const hasSigned = Boolean(user)
            if (!hasSigned) {
              const {pathname} = get('location')
              store.signUp.back.set(pathname)
              store.signIn.back.set(pathname)
              debug(`Ask sign in for: ${pathname}`)
              history.push(Urls.SIGNASK_URL)
            }
          }
        }

      }
    )
  )
}

export default onlySigned
