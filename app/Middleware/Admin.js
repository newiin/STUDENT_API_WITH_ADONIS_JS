'use strict'

class Admin {

  async handle({ response, auth }, next) {
    try {
      await auth.check()
    } catch (error) {
      response.send({ authError: 'Missing or invalid jwt token' })
    }
    const user = await auth.getUser()
    if (user.role === 2) {
      response.unauthorized({ message: 'Not authorized' })
    } else {
      return await next()
    }



  }
}

module.exports = Admin
