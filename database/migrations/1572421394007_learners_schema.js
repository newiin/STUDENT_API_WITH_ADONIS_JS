'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LearnersSchema extends Schema {
  up() {
    this.create('learners', (table) => {
      table.increments()
      table.integer('learner_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('learning_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('learners')
  }
}

module.exports = LearnersSchema
