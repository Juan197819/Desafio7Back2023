import {Router} from 'express'
import {controllerProducts} from '../controllers/controllerProducts.js'

export const routerProducts = Router()

routerProducts.post('/', controllerProducts.controllerAddProduct)
routerProducts.get('/', controllerProducts.controllerGetProducts) 
routerProducts.get('/:pid',controllerProducts.controllerGetProductById)
routerProducts.put('/:pid', controllerProducts.controllerUpdateProduct)
routerProducts.delete('/:pid', controllerProducts.controllerDeleteProduct)