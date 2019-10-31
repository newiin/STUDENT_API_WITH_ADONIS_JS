'use strict'

const User = use('App/Models/User')

class ResetPasswordController {

  async create({ response, params }) {
    const { token } = params;
    try {
      const user = await User
        .query()
        .where('password_forget_token', token)
        .first()
      response.send(user)
    } catch (error) {
      response.send(error)
    }

  }


  async store({ request, response, params }) {
    const { token } = params;
    const { password } = request.all()
    try {
      const user = await User
        .query()
        .where('password_forget_token', token)
        .first()
      if (user) {
        user.password = password
        user.save()
        response.send({ message: 'your password has been reseted' })
      } else {
        response.send({ message: 'Invalid token or check your email' })
      }

    } catch (error) {
      response.send({ error })
    }

  }
}

module.exports = ResetPasswordController
