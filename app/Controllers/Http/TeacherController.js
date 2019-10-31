'use strict'

const User = use('App/Models/User')
class TeacherController {
  async index({ response }) {
    try {
      const teachers = await User
        .query()
        .with('courses')
        .where('role', 1)
        .fetch()
      response.send({ teachers: teachers })
    } catch (error) {
      response.send({ error: error.message })
    }

  }
}

module.exports = TeacherController
