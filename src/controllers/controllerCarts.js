import { serviceCarts } from "../services/serviceCarts.js"

class ControllerCarts {

    async controllerAddCart (req, res, next){
        try {
            const response = await serviceCarts.serviceAddCart()
            res.status(200).json(response)           
        } catch (error) {
            next(error)
        }
    }
    async controllerGetProdToCart (req, res, next){
        try {
            const {cid} = req.params
            const products = await serviceCarts.serviceGetProdToCart(cid)
            if (!products.length) throw new Error("There are no products in your cart yet")
            res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }
    async controllerAddProductToCart (req, res, next){
        try {
            const {cid, pid} = req.params
            const cart = await serviceCarts.serviceAddProductToCart(cid,pid)
            res.status(200).json(cart)
        } catch (error) {
            next(error)
        }
    }
    async controllerDeleteProductToCart (req, res, next){
        try {
            const {cid, pid} = req.params
            const cart = await serviceCarts.serviceDeleteProductToCart(cid,pid)
            res.status(200).json(cart)
        } catch (error) {
            next(error)
        }
    }
    async controllerUpdateAllProductsToCart (req, res, next){
        try {
            const {cid} = req.params
            const newCart = req.body
            const cart = await serviceCarts.serviceUpdateAllProductsToCart(cid, newCart)
            res.status(200).json(cart)
        } catch (error) {
            next(error)
        }
    }
    async controllerUpdateQuantityProdToCart (req, res, next){
        try {
            const {cid, pid} = req.params
            const {quantity} = req.body

            const cart = await serviceCarts.serviceUpdateQuantityProdToCart(cid,pid,quantity)
            res.status(200).json(cart)
        } catch (error) {
            next(error)
        }
    }
    async controllerDeleteAllProductsToCart (req, res, next){
        try {
            const {cid, pid} = req.params
            const cart = await serviceCarts.serviceDeleteAllProductsToCart(cid,pid)
            res.status(200).json(cart)
        } catch (error) {
            next(error)
        }
    }
}

export const controllerCarts = new ControllerCarts()