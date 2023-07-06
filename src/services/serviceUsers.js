import 'dotenv/config'
const PERSISTENCIA = process.env.PERSISTENCIA //FileSystem o MongoDB (BD actual MongoDB en archivo .env)
const {default: daoUsers} = await import(`../daos/${PERSISTENCIA}/daoUsers.js`)

class ServiceUsers {
    async serviceAddUser (user){
        try {
            const newUser = await daoUsers.addUser(user)
            return newUser
        } catch (error) {
            throw error
        }
    }
    async serviceLogin (user){
        try {
            const {email, password} = user
            const [isExist] = await daoUsers.getUserByEmail(email)

            return isExist
        } catch (error) {
            throw error
        }
    }
}
export const serviceUsers = new ServiceUsers()