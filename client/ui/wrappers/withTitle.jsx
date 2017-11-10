'use strict'

import React from 'react'
import { get } from 'the-window'

/** @lends withTitle */
function withTitle (Component, getTitle = () => null) {
  return class WithTitle extends React.Component {
    constructor (props) {
      super(props)
      const s = this
      s._titleQueue = []
    }

    render () {
      const s = this

      return <Component {...props} />
    }

    componentDidMount () {
      const s = this
      s.updateTitle()
    }

    componentDidUpdate () {
      const s = this
      s.updateTitle()
    }

    componentWillUnmount () {
      const s = this
      while (s._titleQueue.length) {
        document.title = s._titleQueue.pop()
      }
    }

    updateTitle () {
      const document = get('window.document')
      const s = this

      const {l} = s.props
      const title = getTitle(props)
      if (document.title !== title) {
        s._titleQueue.push(document.title)
        document.title = `${title} | ${l('app.APP_NAME')}`
      }
    }
  }
}

export default withTitle