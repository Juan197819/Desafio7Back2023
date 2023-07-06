import {Router} from 'express'
import { controllerViews } from '../controllers/controllerViews.js'
import { authLogin1, authLogin2} from '../middleware/authLogin.js'

export const routerViews = Router()

routerViews.get('/', authLogin1, controllerViews.controllerHome) 
routerViews.get('/realtimeproducts', controllerViews.controllerRealtimeproducts) 
routerViews.get('/products',authLogin1, controllerViews.controllerProducts) 
routerViews.get('/carts/:cid', authLogin1, controllerViews.controllerViewCart) 

routerViews.get('/register', authLogin2, controllerViews.controllerViewsRegister) 
routerViews.get('/login', authLogin2,  controllerViews.controllerViewsLogin) 
routerViews.get('/errorRegister', controllerViews.controllerViewsErrorRegister) 
routerViews.get('/errorLogin', controllerViews.controllerViewsErrorLogin) 
routerViews.get('/logout', controllerViews.controllerLogout) 