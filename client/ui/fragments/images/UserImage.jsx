/**
 * UserImage component
 */
'use strict'

import React from 'react'
import c from 'classnames'
import { TheUserImage } from 'the-site-components'
import styles from './UserImage.pcss'

const UserImage = function UserImageImpl ({
                                            className,
                                            size = 48,
                                            user,
                                          }) {
  return (
    <TheUserImage className={c(styles.self, className)}
                  {...{size, user,}}
    />
  )
}

export default UserImage
