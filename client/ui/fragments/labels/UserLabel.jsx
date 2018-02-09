/**
 * UserLabel component
 */
'use strict'

import c from 'classnames'
import React from 'react'
import styles from './UserLabel.pcss'
import UserImage from '../images/UserImage'

const UserLabel = function UserLabelImpl ({
                                            className,
                                            user,
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
