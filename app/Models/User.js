'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }
  tokens() {
    return this.hasMany('App/Models/Token')
  }
  courses() {
    return this.belongsToMany('App/Models/Course')
      .pivotModel('App/Models/CourseUser')
      .withPivot(['change_course_limit', 'created_at', 'updated_at'])
  }
  learning() {
    return $this.belongsToMany('App / Models / Course', 'learners', 'learner_id', 'learning_id');
  }


  learners() {
    return $this.belongsToMany('App / Models / Course', 'learners', 'learning_id', 'learner_id');
  }
}

module.exports = User
