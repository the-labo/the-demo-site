'use strict'

const c = require('./concerns')
const Story = require('./Story')
const {Urls} = require('../../conf')

const PasswordChangeStoryBase = c.compose(
  c.signOperative,
  c.accountOperative,
  c.passwordOperative,
)(Story)

class PasswordChangeStory extends PasswordChangeStoryBase {
  async run () {

    const name = 'e2e'
    const password = 'e2e'
    const updatedPassword = 'e2e-updated'

    await this.phase('Sign In', async ({ok}) => {
      await this.operateSignIn(name, password)
      ok(true)
    })

    await this.phase('Show mypage', async ({ok}) => {
      const {l} = this
      const {title} = await this.operateAccountMypage()
      ok(title.match(l('titles.ACCOUNT_MYPAGE_TITLE')))
    })

    await this.phase('Change the password', async ({ok}) => {
      const {l} = this
      const {title} = await this.operatePasswordChange(updatedPassword)
    })

    await this.phase('Out After Change', async ({ok}) => {
      await this.operateSignOut()
    })

    await this.phase('In With Changed', async ({ok}) => {
      await this.operateSignIn(name, updatedPassword)
      ok(true)
    })

    await this.phase('Restore to Old', async ({ok}) => {
      const {l} = this
      const {title} = await this.operatePasswordChange(password)
    })

    await this.phase('Out to Finish', async ({ok}) => {
      await this.operateSignOut()
    })
  }
}

module.exports = PasswordChangeStory

if (!module.parent) {
  require('../singleton').telStory(module.exports)
}
