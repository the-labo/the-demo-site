/**
 * RecoverCtrl
 * @class RecoverCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const {compose,} = require('the-controller-mixins')
const {withAlias,} = require('./concerns')
const {Lifetimes, Urls,} = require('@self/conf')

const RecoverCtrlBase = compose(
  withAlias
)(Ctrl)

/** @lends RecoverCtrl */
class RecoverCtrl extends RecoverCtrlBase {
  async send (email) {
    const {
      lang,
      mail,
      services: {recoverService},
    } = this
    const {envelop, expireAt, user} = await recoverService.processPrepare({
      email,
      expireIn: Lifetimes.RECOVER_EMAIL_LIFETIME
    })
    const seal = await this._sealFor(envelop)
    const url = await this._aliasUrlFor(Urls.ACCOUNT_RECOVER_RESET_URL, {envelop, seal, expireAt})
    this._debug(`Create recover url: ${url}`)
    await mail.sendRecover({expireAt, lang, url, user,})
  }

  async reset ({envelop, password, seal: sealString,} = {}) {
    const {
      services: {recoverService},
    } = this
    await this._assertSeal(sealString, envelop)
    const {sign, user,} = await recoverService.processReset({envelop, password})
    await this._setAuthorized({sign, user,})
    await this._reloadAuthorized()
  }
}

module.exports = RecoverCtrl