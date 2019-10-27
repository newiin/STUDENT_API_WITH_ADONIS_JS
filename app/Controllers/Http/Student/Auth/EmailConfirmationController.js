'use strict'
const Token = use('App/Models/Token')
const User = use('App/Models/User')
class EmailConfirmationController {

  async confirmation({ params, response }) {
    const { token } = params
    try {
      const tokens = await Token
        .query()
        .with('user')
        .where('token', '=', token)
        .first()

      const user = new User()
      user.is_verified = true
      await tokens.user().update(user)
      return response.send({ tokens, message: "your account has been verify Login to your account" })
    } catch (error) {

      return response.send({ "error": error })
    }
  }



}

module.exports = EmailConfirmationController
