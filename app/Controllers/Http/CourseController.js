'use strict'
const Course = use('App/Models/Course')
class CourseController {

  async index({ response }) {
    const courses = await Course.all();


    response.send({ courses })
  }



  async store({ session, request, response, auth }) {
    const { speciality_id } = request.all();
    try {
      await auth.user.specialities().attach(speciality_id)
      session.flash({
        notification: {
          type: 'success',
          message: `Your Course has been Created`
        }
      })
      response.redirect('back')
    } catch (error) {
      session.flash({
        notification: {
          type: 'negative',
          message: `we could not create your course`
        }
      })
      response.redirect('back')
    }
  }

  async show({ request, response }) {
    const { slug } = request.all();
    try {
      const course = await Course.findBy('slug', slug)
      response.send({ course })
    } catch (error) {
      response.send({ error: error.message })
    }
  }
}

module.exports = CourseController
