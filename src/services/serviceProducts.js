import 'dotenv/config'
const PERSISTENCIA = process.env.PERSISTENCIA //FileSystem o MongoDB (BD actual MongoDB en archivo .env)
const {default: daoProducts} = await import(`../daos/${PERSISTENCIA}/daoProducts.js`)
console.log('Persistencia' ,PERSISTENCIA)

class ServiceProducts {
    async serviceAddProduct (product){
        try {
            const newProduct = await daoProducts.addProduct(product)
            return newProduct
        } catch (error) {
            throw error
        }
    }
    async serviceGetProducts (limit, page, sort, query){
        try {
            const productos = await daoProducts.getProducts(limit, page, sort, query)
            return productos
        } catch (error) {
            throw error
        }
    }
    async serviceGetProductById (id){
        try {
            const product = await daoProducts.getProductById(id)
            return product
        } catch (error) {
            throw error
        }
    }
    async serviceUpdateProduct (id, product){
        try {
            const response = await daoProducts.updateProduct(id, product)
            return response
        } catch (error) {
            throw error
        }
    }
    async serviceDeleteProduct (id){
        try {
            const response = await daoProducts.deleteProduct(id)
            return response
        } catch (error) {
            throw error
        }
    }
}
export const serviceProducts = new ServiceProducts()