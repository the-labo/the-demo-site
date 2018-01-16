/**
 * RecoverCtrl
 * @class RecoverCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const {compose, withDebug} = require('the-controller-mixins')
const {withAlias,} = require('./concerns')
const {Urls, Lifetimes} = require('@self/conf')

const RecoverCtrlBase = compose(

  withAlias
)(Ctrl)

/** @lends RecoverCtrl */
class RecoverCtrl extends RecoverCtrlBase {
  async send (email) {
    const {
      mail,
      lang,
      services: {recoverService},
    } = this
    const {envelop, expireAt, user} = await recoverService.processPrepare({
      email,
      expireIn: Lifetimes.RECOVER_EMAIL_LIFETIME
    })
    const seal = await this._sealFor(envelop)
    const url = await this._aliasUrlFor(Urls.RECOVER_RESET_URL, {envelop, seal, expireAt})
    this._debug(`Create recover url: ${url}`)
    await mail.sendRecover({lang, user, url, expireAt})
  }

  async reset ({seal: sealString, envelop, password} = {}) {
    const {
      services: {recoverService},
    } = this
    await this._assertSeal(sealString, envelop)
    const {user, sign} = await recoverService.processReset({envelop, password})
    await this._setAuthorized({user, sign})
    await this._reloadAuthorized()
  }
}

module.exports = RecoverCtrl