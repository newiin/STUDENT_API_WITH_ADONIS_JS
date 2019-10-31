'use strict'
const { validateAll } = use('Validator')
const User = use('App/Models/User')

class LoginController {

  async store({ request, response, auth }) {
    const rules = {
      email: 'required|email',
      password: 'required|min:8',
    }
    const messages = {
      'password.required': 'You must provide a password',
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'password.min': 'Password must be at least 8 characters'
    }
    const validation = await validateAll(request.all(), rules, messages)
    if (validation.fails()) {
      response.send({ error: validation.messages() })
    } else {
      const { email, password } = request.all();
      try {
        const user = await auth.attempt(email, password)
        if (user) {
          const current_user = await User.findBy('email', email)
          const user_to_json = current_user.toJSON();
          if (user_to_json.is_verified) {
            await current_user.tokens().where('type', '=', 'bearer').update({ token: user.token, is_revoked: false })
            response.send({ user, current_user })
          } else {
            await auth
              .authenticator('jwt')
              .revokeTokens([user.token])
            response.send({ message: "verified youyr email first" })
          }

        }


      } catch (error) {
        if (error.name === "UserNotFoundException") {
          response.send({ "error": `Cannot find user with email ${email}` })
        }
        if (error.name === "PasswordMisMatchException") {
          response.send({ "error": `Invalid password` })
        }
      }
    }
  }

}

module.exports = LoginController
