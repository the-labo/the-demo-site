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
          const s = this
          const {props} = s
          return <Component {...props}/>
        }

        componentDidMount () {
          const s = this
          s.makeSureSigned()
        }

        componentDidUpdate () {
          const s = this
          s.makeSureSigned()
        }

        makeSureSigned () {
          const s = this
          const {store, history} = s.props
          const {signed, back} = store.sign
          const synced = signed.synced.state
          if (synced) {
            const user = signed.user.state
            let hasSigned = Boolean(user)
            if (!hasSigned) {
              const {pathname} = get('location')
              back.set(pathname)
              debug(`Ask sign in for: ${back.state}`)
              history.push(Urls.SIGNASK_URL)
            }
          }
        }

      }
    )
  )
}

export default onlySigned
