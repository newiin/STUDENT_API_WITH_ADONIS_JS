'use strict'
const { validateAll } = use('Validator')
const User = use('App/Models/User')
const Mail = use('Mail')
const uuidv4 = require('uuid/v4');
class ForgotPasswordController {
  async store({ request, response, auth }) {
    const rules = {
      email: 'required|email',
    }
    const messages = {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
    }
    const validation = await validateAll(request.all(), rules, messages)
    if (validation.fails()) {
      return response.send({ error: validation.messages() })
    }
    const { email } = request.all()

    try {
      const user = await User.findBy('email', email)


      if (user) {

        const token = uuidv4()
        user.password_forget_token = token
        user.save()
        const data = { user: user.toJSON(), token: token }
        await Mail.send('emails.forgot', data, (message) => {
          message.to(user.email)
          message.from('studentapi@email.com')
        })
        response.send({ message: 'An email has been sent to you' })
      } else {
        response.send({ message: 'this account is not reconize' })
      }
    } catch (error) {
      response.send({ error })
    }
  }
}

module.exports = ForgotPasswordController
