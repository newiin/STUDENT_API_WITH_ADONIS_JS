'use strict'

class DashboardController {

    async index({ response, auth }) {


        try {
            const user = await auth.getUser()
            const my_courses = await user
                .courses()
                .distinct('course_id')
                .fetch()
            response.send({ user, courses: my_courses })
        } catch (error) {
            response.send({ error })
        }
    }

    async speciality({ response, auth, request }) {
        try {
            const user = await auth.getUser()
            const { course_id } = request.all();
            const courses = await user.courses().attach(course_id)
            response.send({ courses })
        } catch (error) {
            response.send({ error })
        }

    }

}




module.exports = DashboardController
