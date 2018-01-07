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
                                            user,
                                            size = 48
                                          }) {
  return (
    <TheUserImage className={c(styles.self, className)}
                  {...{user, size}}
    />
  )
}

export default UserImage
