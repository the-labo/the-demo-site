/**
 * UserLabel component
 */
'use strict'

import React from 'react'
import c from 'classnames'
import UserImage from '../images/UserImage'
import styles from './UserLabel.pcss'

const UserLabel = function UserLabelImpl ({
                                            className,
                                            user
                                          }) {
  return (
    <div className={c(styles.self, className)}>
      <UserImage {...{user}}
                 className={styles.image}
                 size={24}
      />
      <span>{user.displayName}</span>
    </div>
  )
}

export default UserLabel
