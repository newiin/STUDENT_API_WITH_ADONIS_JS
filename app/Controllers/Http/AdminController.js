'use strict'
const Course = use('App/Models/Course')
const { validate, sanitizor } = use('Validator')

class AdminController {
    async store({ request, response }) {
        const rules = {
            name: 'required|unique:courses'
        }
        const messages = {
            'name.required': 'You must provide a name for the course',
            'name.unique': 'The name must to be unique',
        }

        const validation = await validate(request.all(), rules, messages)
        if (validation.fails()) {
            return response.send({ error: validation.messages() })
        }
        const { name, credit } = request.all()
        const slug = sanitizor.slug(name)

        try {
            const course = await Course.create({ name, slug, credit })
            response.send({ course })
        } catch (error) {


            response.send({ error: error.name })
        }

    }



    async delete({ request, response }) {
        const { id } = request.all();
        const id_to_integer = parseInt(id)
        try {
            const course = await Course.find(id_to_integer)
            await course.delete()
            response.send({ message: `the course ${course.name} has been deleted` })
        } catch (error) {
            response.send({ error: error.message })
        }
    }

    async logout({ auth, response }) {
        try {

            const token = auth.getAuthHeader()
            await auth
                .authenticator('jwt')
                .revokeTokens([token])

            response.send({ message: 'admin logout sucessfull' })
        } catch (error) {
            response.send(error)
        }


    }
}

module.exports = AdminController
