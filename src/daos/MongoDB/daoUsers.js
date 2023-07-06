import { ModelUsers } from "./models/modelUsers.js";

class DaoUsers {
    async addUser(user){
        try {
            const userExist = await this.getUserByEmail(user.email)
            console.log('userExist', userExist.length)
            if (!userExist.length) {
                console.log('entre')
                if(user.email=='adminCoder@coder.com' &&user.password=='adminCod3r123') user.role='admin'
                return await ModelUsers.create(user)
            }else{
                console.log('no entre')
                return null
            }
        } catch (error) {
            throw (error)   
        }  
    }
    async getUserByEmail(email){
        try {
            return await ModelUsers.find({email})
        } catch (error) {
            throw (error)   
        }
    }
}
const daoUsers = new DaoUsers()

export default daoUsers