'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const Hash = use('Hash')
class ResetPasswordController {

  async create({ response, params }) {
    const { token } = params;
    try {
      const user = await Token
        .query()
        .with('user')
        .where('type', 'forgot')
        .where('token', token)
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
      const tokens = await Token
        .query()
        .with('user')
        .where('type', 'forgot')
        .where('token', token)
        .first()
      const user = new User()
      user.password = await Hash.make(password)
      tokens.token = ''
      await tokens.save()
      await tokens.user().update(user)
      response.send({ message: 'your password has been reseted', tokens })
    } catch (error) {
      response.send(error)
    }

  }
}

module.exports = ResetPasswordController
