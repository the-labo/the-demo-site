/**
 * Hook for user
 */
'use strict'

const { HistoryTypes } = require('@self/conf')
const debug = require('debug')('app:hook:userHook')

function UserHook (db) {
  const { History, User } = db.resources
  return {
    async onDestroy ({ gone, id }) {
      const key = User.refOf(id)
      debug('User Destroy', key)
      await History.create({
        data: gone.toObject(),
        key,
        type: HistoryTypes.GONE_USER,
      })
    },
  }
}

module.exports = UserHook
