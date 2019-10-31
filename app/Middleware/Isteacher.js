'use strict'

class Isteacher {

  async handle({ auth, response }, next) {
    try {
      await auth.check()
    } catch (error) {
      response.send({ authError: 'Missing or invalid jwt token' })
    }
    const user = await auth.getUser()
    if (user.role === 0 || user.role === 2) {
      response.unauthorized({ message: 'Not authorized' })
    } else if (user.is_verified === 0) {
      response.send({ message: "your email has not being verified" })
    } else {
      return await next()
    }

  }
}

module.exports = Isteacher
