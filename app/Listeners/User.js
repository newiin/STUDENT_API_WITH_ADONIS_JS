'use strict'
const Mail = use('Mail')
const User = exports = module.exports = {}
User.register = async ({ user, token }) => {
    const data = { user: user.toJSON(), token: token }
    await Mail.send('emails.new-user', data, (message) => {
        message.to(user.email)
        message.from('studentapi@email.com')
    })

}
