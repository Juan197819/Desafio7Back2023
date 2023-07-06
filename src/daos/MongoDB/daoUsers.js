import { ModelUsers } from "./models/modelUsers.js";

class DaoUsers {
    async addUser(user){
        try {
            const userExist = await this.getUserByEmail(user.email)
            if (!userExist.length) {
                if(user.email=='adminCoder@coder.com' &&user.password=='adminCod3r123') user.role='admin'
                return await ModelUsers.create(user)
            }else{
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