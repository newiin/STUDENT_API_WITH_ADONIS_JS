'use strict'
const Course = use('App/Models/Course')
const User = use('App/Models/user')
const Database = use('Database')
const moment = require('moment')
class DashboardController {
    async index({ response, request, auth }) {

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

    async update({ response, auth, request }) {
        const body = request.all();
        try {
            const user = await auth.getUser()
            user.merge(body)
            await user.save()
            response.send({ user })
        } catch (error) {

            response.send({ error })
        }

    }

    async choose_my_course({ response, auth, request }) {
        try {
            const user = await auth.getUser()
            const { course_id } = request.all();
            const courses = await user.courses().attach(course_id)
            response.send({ courses })
        } catch (error) {
            response.send({ error })
        }

    }
    async update_my_course({ response, auth, request }) {

        try {
            const { id, course_id } = request.all();
            const id_to_integer = parseInt(id)
            const user = await auth.getUser()
            const user_has_courses = await user.courses().where('course_id', id_to_integer).fetch()
            if (user_has_courses.rows.length) {
                const course = await user.courses().pivotQuery().where('course_id', id_to_integer).fetch()
                const course_update_dealine = (new Date().getTime() - (new Date(course.rows[0].created_at).getTime()) + (3600 * 60 * 60 * 7));
                if (course.rows[0].change_course_limit != 0 || course_update_dealine <= 0) {

                    response.send({ message: "Sorry course already updated or 7 days have passed for any updating " })
                } else {

                    const course = await user.courses().pivotQuery().where('course_id', id_to_integer).update({ course_id, change_course_limit: 1 })
                    response.send({ message: "Your course has been udpated succesfully", course })

                }

            }

        } catch (error) {
            response.send({ error })
        }

    }
}

module.exports = DashboardController
