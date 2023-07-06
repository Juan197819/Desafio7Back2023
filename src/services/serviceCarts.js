import 'dotenv/config'
const PERSISTENCIA = process.env.PERSISTENCIA //FileSystem o MongoDB (BD actual MongoDB en archivo .env)
const {default: daoCart} = await import(`../daos/${PERSISTENCIA}/daoCarts.js`)

class ServiceCarts {
    async serviceAddCart (){
        try {
            const newCart = await daoCart.addCart()
            return newCart
        } catch (error) {
            throw error
        }
    }
    async serviceGetProdToCart (cid){
        try {
            const cart = await daoCart.getProdToCart(cid)//C/ FileSystem devuelve cart existente con o sin productos o salta el error en DAO
            return cart.products
        } catch (error) {
            throw error
        }
    }
    async serviceAddProductToCart (cid, pid){
        try {
            const cartUpdated = await daoCart.addProductToCart(cid,pid)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceDeleteProductToCart (cid, pid){
        try {
            const cartUpdated = await daoCart.deleteProductToCart(cid,pid)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceUpdateAllProductsToCart (cid, newCart){
        try {
            const cartUpdated = await daoCart.updateAllProductsToCart(cid, newCart)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceUpdateQuantityProdToCart (cid, pid, quantity){
        try {
            const cartUpdated = await daoCart.updateQuantityProdToCart(cid,pid, quantity)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceDeleteAllProductsToCart (cid, pid){
        try {
            const cartUpdated = await daoCart.deleteAllProductsToCart(cid,pid)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
}
export const serviceCarts = new ServiceCarts()