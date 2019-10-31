'use strict'
const User = use('App/Models/User')
class StudentController {
    async index({ response }) {
        try {
            const students = await User
                .query()
                .where('role', false)
                .fetch()
            response.send({ students: students })
        } catch (error) {
            response.send({ error: error.message })
        }

    }
}

module.exports = StudentController
