'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CourseUser extends Model {
    static boot() {
        super.boot()
        this.addHook('beforeCreate', (CourseUser) => {

            CourseUser.change_course_limit = 0
        })
    }
}

module.exports = CourseUser
