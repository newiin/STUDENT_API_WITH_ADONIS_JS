'use strict'
const Mail = use('Mail')
const User = exports = module.exports = {}
User.register = async ({ user, email_token }) => {
    const data = { user: user.toJSON(), email_token: email_token }
    await Mail.send('emails.new-user', data, (message) => {
        message.to(user.email)
        message.from('studentapi@email.com')
    })

}

User.register_teacher = async ({ user, email_token }) => {
    const data = { user: user.toJSON(), email_token: email_token }
    await Mail.send('emails.new-teacher', data, (message) => {
        message.to(user.email)
        message.from('studentapi@email.com')
    })

}
