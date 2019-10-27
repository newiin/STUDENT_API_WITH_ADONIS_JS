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
        const check_user = await auth.attempt(email, password)
        if (check_user) {
          const user = await User
            .query()
            .with('tokens')
            .where('is_verified', true)
            .first()
          if (user === null) {
            response.send({ 'message': 'verified your email first' })
          } else {
            response.send({ user })
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
