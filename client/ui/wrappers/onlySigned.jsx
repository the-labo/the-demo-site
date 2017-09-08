/**
 * Wrap to restrict access for only signed
 * @function onlySigned
 */
'use strict'

import React from 'react'
import { withStore } from 'the-store'
import { get } from 'the-window'
import { Urls } from '@self/conf'

function onlySigned (Component, options = {}) {

  return withStore(
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
        const {store} = s.props
        const {signed} = store.sign
        const synced = signed.synced.state
        if (synced) {
          const user = signed.user.state
          let hasSigned = Boolean(user)
          if (!hasSigned) {
            const location = get('location')
            location.href = Urls.SIGNIN_URL
          }
        }
      }

    }
  )
}

export default onlySigned
