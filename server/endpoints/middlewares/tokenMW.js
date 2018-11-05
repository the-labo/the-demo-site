/**
 * Handle token
 * @function tokenMW
 */
'use strict'

/** @lends tokenMW */
function tokenMW (route) {
  async function tokenRoute (ctx) {
    const {
      app: {
        db: { resources: { Token } },
      },
      query = {},
      request: { body = {} },
    } = ctx
    const token = body.token || query.token
    ctx.token = await Token.verify(token)
    await route(ctx)
  }

  return tokenRoute
}

module.exports = tokenMW
