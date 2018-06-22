/**
 * HeaderLessStyle component
 */
'use strict'

import React from 'react'

class HeaderLessStyle extends React.Component {
  render () {
    const {enabled} = this.props
    if (!enabled) {
      return null
    }
    return (
      <style dangerouslySetInnerHTML={{
        __html: `
.the-header {display: none !important;}

`,
      }}/>
    )
  }
}

export default HeaderLessStyle
