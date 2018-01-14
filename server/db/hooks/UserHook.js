/**
 * Hook for user
 */
'use strict'

const debug = require('debug')('app:hook:userHook')
const {HistoryTypes} = require('@self/conf')

function UserHook (db) {
  const {History, User} = db.resources
  return {
    async onDestroy ({id, gone}) {
      const key = User.refOf(id)
      debug('User Destroy', key)
      await History.create({
        type: HistoryTypes.GONE_USER,
        data: gone.toObject(),
        key,
      })
    }
  }
}

module.exports = UserHook
