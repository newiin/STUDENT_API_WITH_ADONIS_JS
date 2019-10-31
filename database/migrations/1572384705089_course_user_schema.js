'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourseUserSchema extends Schema {
  up() {
    this.table('course_user', (table) => {
      table.timestamps()

    })
  }

  down() {
    this.table('course_user', (table) => {
      table.timestamps()
    })
  }
}

module.exports = CourseUserSchema
