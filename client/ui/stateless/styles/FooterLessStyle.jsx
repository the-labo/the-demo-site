/**
 * FooterLessStyle component
 */
'use strict'

import React from 'react'

class FooterLessStyle extends React.Component {
  render () {
    const {enabled} = this.props
    if (!enabled) {
      return null
    }
    return (
      <style dangerouslySetInnerHTML={{
        __html: `
.the-footer {display: none !important;}

`,
      }}/>
    )
  }
}

export default FooterLessStyle
