'use strict'

import React from 'react'
import { get } from 'the-window'

/** @lends withTitle */
function withTitle (Component, titleFor = (props) => null) {
  return class WithTitle extends React.Component {
    constructor (props) {
      super(props)
      const s = this
      s._titleQueue = []
    }

    render () {
      const s = this
      const {props} = s
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

    getTitle () {
      const s = this
      const {l} = s.props
      const title = titleFor(s.props)
      const appName = l('app.APP_NAME')
      return title ? `${title} | ${appName}` : appName
    }

    updateTitle () {
      const document = get('window.document')
      const s = this
      const title = s.getTitle(s.props)
      if (document.title !== title) {
        s._titleQueue.push(document.title)
        document.title = title
      }
    }
  }
}

export default withTitle