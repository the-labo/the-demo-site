/**
 * UserCard component
 */
'use strict'

import c from 'classnames'
import React from 'react'
import { stateless } from 'the-component-mixins'
import styles from './UserCard.pcss'
import UserImage from '../images/UserImage'

function UserCard ({
                     className,
                     user,
                   }) {
  return (
    <div className={c(styles.self, className)}>
      <UserImage {...{user}}
                 className={styles.image}
                 size={24}
      />
      <span className={styles.text}>{user.displayName}</span>
    </div>
  )
}

export default stateless({
  onlyIf: 'user',
})(UserCard)
