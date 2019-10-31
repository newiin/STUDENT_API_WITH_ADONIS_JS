const Event = use('Event')
// User
Event.on('new::user', 'User.register')
Event.on('new::teacher', 'User.register_teacher')