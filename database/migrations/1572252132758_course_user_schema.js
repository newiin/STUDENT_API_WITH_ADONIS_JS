'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourseUserSchema extends Schema {
  up() {
    this.create('course_user', (table) => {
      table.increments()
      table.integer('course_id').unsigned().references('id').inTable('courses').onDelete('cascade')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade')
    })
  }

  down() {
    this.drop('course_user')
  }
}

module.exports = CourseUserSchema
