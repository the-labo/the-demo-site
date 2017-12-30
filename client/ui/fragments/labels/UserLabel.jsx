/**
 * UserLabel component
 */
'use strict'

import React from 'react'
import c from 'classnames'
import UserImage from '../images/UserImage'
import { labelHelper } from '../../helpers'
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
      <span>{labelHelper.labelTextForUser(user)}</span>
    </div>
  )
}

export default UserLabel
