/**
 * UserImage component
 */
'use strict'

import React from 'react'
import c from 'classnames'
import { TheImage } from 'the-components'
import { labelHelper } from '../../helpers'
import styles from './UserImage.pcss'

const UserImage = function UserImageImpl ({
                                            className,
                                            user,
                                            size = 48
                                          }) {
  const {profile} = user || {}
  const {image: src} = profile
  if (!src) {
    return null
  }
  return (
    <TheImage className={c(styles.self, className)}
              alt={labelHelper.labelTextForUser(user)}
              width={size}
              height={size}
              src={src}
              scale={'fit'}
    />
  )
}

export default UserImage
