'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Course extends Model {

    users() {
        return this.belongsToMany('App/Models/User')
            .pivotModel('App/Models/CourseUser')
            .withPivot(['change_course_limit', 'created_at', 'updated_at'])
            .withTimestamps()
    }
}

module.exports = Course
