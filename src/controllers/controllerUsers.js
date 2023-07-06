import { serviceUsers } from "../services/serviceUsers.js"

class ControllerUsers {
    async controllerRegister (req, res, next){
        try {
            const newUser = req.body
            const response = await serviceUsers.serviceAddUser(newUser)
            if (response) {
                res.status(300).redirect('../../login')           
            } else {
                res.status(400).redirect('../../errorRegister')           
            }
        } catch (error) {
            next(error)
        }
    }
    async controllerLogin (req, res, next){
        try {
            const user = req.body
            const isExist = await serviceUsers.serviceLogin(user)
            if ( isExist?.password==user.password) { 
                req.session.user = {
                    name: isExist.firstName+' '+isExist.lastName,
                    email: isExist.email,
                    role:isExist.role
                }
                res.status(200).redirect('../../')           
            } else {
                res.status(400).redirect('../../errorLogin')           
            }
        } catch (error) {
            next(error)
        }
    }
}

export const controllerUsers = new ControllerUsers()