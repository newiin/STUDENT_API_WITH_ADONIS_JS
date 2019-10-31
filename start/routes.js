'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Welcome to our API' }
})


// Student Routes
Route.group(() => {
  Route.post('/register', 'Student/Auth/RegisterController.store')
  Route.post('/login', 'Student/Auth/LoginController.store')
  Route.get('/confirmation/:token', 'Student/Auth/EmailConfirmationController.confirmation')
  Route.post('/forgot', 'Student/Auth/ForgotPasswordController.store')
  Route.get('/reset/:token', 'Student/Auth/ResetPasswordController.create')
  Route.post('/reset/:token', 'Student/Auth/ResetPasswordController.store')
}).prefix('/api/v1/auth')

Route.get('/courses', 'CourseController.index').prefix('/api/v1/')
Route.get('/students', 'StudentController.index').prefix('/api/v1/')
Route.get('/teachers', 'TeacherController.index').prefix('/api/v1/')
Route.post('/create', 'AdminController.store').prefix('/api/v1/')
Route.get('/course', 'CourseController.show').prefix('/api/v1/')

Route.group(() => {
  Route.get('/auth/logout', 'Student/Auth/LogoutController.logout')
  Route.get('/my', 'Student/DashboardController.index')
  Route.put('/my/edit', 'Student/DashboardController.update')
  Route.post('/my/choose/course', 'Student/DashboardController.choose_my_course')
  Route.put('/my/course/edit', 'Student/DashboardController.update_my_course')
}).prefix('/api/v1/').middleware('auth');

// Teacher Routes
Route.group(() => {
  Route.post('/register', 'Teacher/Auth/RegisterController.store')
  Route.post('/login', 'Teacher/Auth/LoginController.store')
  Route.get('/confirmation/:token', 'Teacher/Auth/EmailConfirmationController.confirmation')
  Route.post('/forgot', 'Teacher/Auth/ForgotPasswordController.store')
  Route.get('/reset/:token', 'Teacher/Auth/ResetPasswordController.create')
  Route.post('/reset/:token', 'Teacher/Auth/ResetPasswordController.store')
}).prefix('/api/v1/staff/auth')

Route.group(() => {
  Route.get('/auth/logout', 'Teacher/Auth/LogoutController.logout')
  Route.get('/my', 'Teacher/DashboardController.index')
  Route.post('/my/speciality', 'Teacher/DashboardController.speciality')
}).prefix('/api/v1/staff').middleware('teacher');

// Admin

Route.group(() => {
  Route.get('/auth/logout', 'AdminController.logout')
  Route.post('/course/create', 'AdminController.store')
  Route.delete('/course/:id', 'AdminController.delete')

}).prefix('/api/v1/admin').middleware('admin');