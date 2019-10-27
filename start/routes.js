'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.group(() => {
  Route.post('/register', 'Student/Auth/RegisterController.store')
  Route.post('/login', 'Student/Auth/LoginController.store')
  Route.get('/confirmation/:token', 'Student/Auth/EmailConfirmationController.confirmation')
  Route.post('/forgot', 'Student/Auth/ForgotPasswordController.store')
  Route.get('/reset/:token', 'Student/Auth/ResetPasswordController.create')
  Route.post('/reset/:token', 'Student/Auth/ResetPasswordController.store')
}).prefix('/api/auth')