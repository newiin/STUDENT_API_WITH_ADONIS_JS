'use strict'
const { validateAll } = use('Validator')
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const Event = use('Event')
class RegisterController {
  async store({ request, response, auth }) {
    const rules = {
      email: 'required|email|unique:users,email',
      surname: 'required',
      name: 'required',
      dob: 'required|date',
      password: 'required|min:8|alpha_numeric',
      address: 'required',
      phone: 'required|number',
    }
    const messages = {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already used.',
      'password.required': 'You must provide a password',
      'surname.required': 'You must provide Your surname',
      'password.min': 'Password must be at least  8 characters'
    }
    const validation = await validateAll(request.all(), rules, messages)
    if (validation.fails()) {
      response.send({ error: validation.messages() })
    } else {
      try {
        const user = await User.create(request.except(['csrf_token']))
        const { token, type } = await auth.generate(user)
        await user.tokens().create({ token: token, type: type, is_revoked: false })
        Event.fire('new::user', { user, token })
        return response.send({ "message": "confirm your email address", "access_token": token })
      } catch (error) {
        return response.send({ errors: error.message })
      }
    }

  }


  async show({ params, request, response, view }) {
  }


  async update({ params, request, response }) {
  }


  async destroy({ params, request, response }) {
  }
}

module.exports = RegisterController
