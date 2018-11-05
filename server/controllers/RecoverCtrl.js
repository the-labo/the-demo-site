/**
 * RecoverCtrl
 * @class RecoverCtrl
 */
'use strict'

const { compose } = require('the-controller-mixins')
const { Lifetimes, Urls } = require('@self/conf')
const { withAlias } = require('./concerns')
const Ctrl = require('./Ctrl')

const RecoverCtrlBase = compose(
  withAlias
)(Ctrl)

/** @lends RecoverCtrl */
class RecoverCtrl extends RecoverCtrlBase {
  async reset ({ envelop, password, seal: sealString } = {}) {
    const {
      services: { recoverService },
    } = this
    await this._assertSeal(sealString, envelop)
    const { sign, user } = await recoverService.processReset({ envelop, password })
    await this._setAuthorized({ sign, user })
    await this._reloadAuthorized()
  }

  async send (email) {
    const {
      lang,
      mail,
      services: { recoverService },
    } = this
    const { envelop, expireAt, user } = await recoverService.processPrepare({
      email,
      expireIn: Lifetimes.RECOVER_EMAIL_LIFETIME,
    })
    const seal = await this._sealFor(envelop)
    const url = await this._aliasUrlFor(Urls.ACCOUNT_RECOVER_RESET_URL, { envelop, expireAt, seal })
    this._debug(`Create recover url: ${url}`)
    await mail.sendRecover({ expireAt, lang, url, user })
  }
}

module.exports = RecoverCtrl
