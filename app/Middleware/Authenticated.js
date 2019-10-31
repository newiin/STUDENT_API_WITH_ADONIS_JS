'use strict'

class Authenticated {

  async handle({ response, auth }, next) {

    try {
      await auth.check()

    } catch (error) {
      return response.send({ authError: 'Missing or invalid jwt token' })
    }
    const user = await auth.getUser()
    if (user.is_verified === 0) {
      response.send({ message: "Verified Your email first" })
    } else {
      return await next();
    }

  }
}

module.exports = Authenticated
