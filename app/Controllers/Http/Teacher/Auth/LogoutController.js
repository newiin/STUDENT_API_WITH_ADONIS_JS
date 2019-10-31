'use strict'

class LogoutController {
    async logout({ auth, response }) {
        try {
            const token = auth.getAuthHeader()

            await auth
                .authenticator('jwt')
                .revokeTokens([token])

            response.send({ message: 'logout sucessfull' })
        } catch (error) {
            response.send(error)
        }


    }

}

module.exports = LogoutController
