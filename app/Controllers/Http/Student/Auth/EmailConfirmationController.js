'use strict'

const User = use('App/Models/User')
class EmailConfirmationController {

  async confirmation({ params, response }) {
    const { token } = params
    try {
      const user = await User
        .query()
        .where('email_verification_token', '=', token)
        .first()
      user.is_verified = true;
      user.email_verification_token = null
      user.save();
      return response.send({ message: "your account has been verify go to login page" })
    } catch (error) {

      return response.send({ error })
    }
  }



}

module.exports = EmailConfirmationController
