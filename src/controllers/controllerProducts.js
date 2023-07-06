import { serviceProducts } from "../services/serviceProducts.js"

class ControllerProducts {

    async controllerAddProduct (req, res, next){
        try {
            const product = req.body
            const response = await serviceProducts.serviceAddProduct(product)
            res.status(200).json(response)           
        } catch (error) {
            next(error)
        }
    }
    async controllerGetProducts (req, res, next){
        try {
            const {limit, page, sort, ...query} = req.query
            const productos = await serviceProducts.serviceGetProducts(limit, page, sort, query)
            res.status(200).json(productos)
        } catch (error) {
            next(error)
        }
    }
    async controllerGetProductById (req, res, next){
        try {
            const {pid} = req.params
            const product = await serviceProducts.serviceGetProductById(pid)
            res.status(200).json(product)        
        } catch (error) {
            next(error)
        }
    }
    async controllerUpdateProduct (req, res, next){
        try {
            const product = req.body
            const {pid} = req.params

            res.status(200).json(await serviceProducts.serviceUpdateProduct(pid, product))
        } catch (error) {
            next(error)
        }
    }
    async controllerDeleteProduct (req, res, next){
        try {
            const {pid} = req.params
            res.status(200).json(await serviceProducts.serviceDeleteProduct(pid))
        } catch (error) {
            next(error)
        }
    }
}

export const controllerProducts = new ControllerProducts()