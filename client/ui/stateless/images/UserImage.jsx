/**
 * UserImage component
 */
'use strict'

import c from 'classnames'
import React from 'react'
import { stateless } from 'the-component-mixins'
import { TheUserImage } from 'the-site-components'
import styles from './UserImage.pcss'

function UserImage ({
                      className,
                      size = 48,
                      user,
                    }) {
  return (
    <TheUserImage className={c(styles.self, className)}
                  {...{size, user}}
    />
  )
}

export default stateless({
  onlyIf: ['user'],
})(
  UserImage
)
