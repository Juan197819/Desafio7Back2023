import {Router} from 'express'
import {controllerUsers} from '../controllers/controllerUsers.js'
export const routerSessions = Router()

routerSessions.post('/register', controllerUsers.controllerRegister)
routerSessions.post('/login', controllerUsers.controllerLogin) 
