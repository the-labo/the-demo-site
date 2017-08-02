/**
 * Scene for home
 * @class HomeScene
 */
'use strict'

const Scene = require('./Scene')

/** @lends HomeScene */
class HomeScene extends Scene {

  // TODO Remove this
  // Just an example
  async countUp () {
    const s = this
    const { store, client, l } = s
    const { app, toast } = store
    await app.busy.true()
    {
      let count
      try {
        let appCtrl = await client.use('app')
        count = await appCtrl.countUp()
      } finally {
        await app.busy.false()
      }
      app.set({ count })
      toast.info.push(l('toasts.COUNT_UP_DID_SUCCESS'))
    }
  }

}

module.exports = HomeScene
