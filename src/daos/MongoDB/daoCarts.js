import { ModelCarts } from "./models/modelCarts.js"

class DaoCarts {
    async #getCartById(id){
        try {
            const cart = await ModelCarts.findById(id)
            console.log('cart Encontrado: ', cart)
            if(!cart) throw new Error('Nonexistent cart!')
            return cart
        } catch (error) {
            throw (error)   
        }
    }
    async addCart(){
        try {
            const newCart = await ModelCarts.create({})
            return newCart            
        } catch (error) {
            throw (error)   
        }
    }
    async getProdToCart(cid){
        try {
            const cart = await this.#getCartById(cid)
            const products =cart.products

            return await cart.populate('products.product')
        } catch (error) {
            throw (error)   
        }
    }
    async addProductToCart(cid, pid){
        try {
            const cart = await this.#getCartById(cid)
            let index = cart.products.findIndex(p=>p.product==pid)
            if (index!=-1) {
                cart.products[index].quantity +=1 
            } else {
                cart.products.push({
                    product:pid,
                    quantity:1
                })                
            }
            await cart.save()
            return cart
        } catch (error) {
            throw (error)   
        }
    }
    async deleteProductToCart(cid, pid){
        try {

            const cart = await this.#getCartById(cid)
            const index= cart.products.findIndex(p=>p==pid)
            if(index==-1 ) throw new Error('Product Not found')
            cart.products.splice(index,1)
            cart.save()
            return cart
        } catch (error) {
            throw (error)   
        }
    }
    async updateAllProductsToCart(cid, newCart){
        try {
            const cart = await this.#getCartById(cid)
            const updateCart = await ModelCarts.updateOne({_id:cid}, {$set: {products:newCart}})
            return 'The cart updated correctly!!'
        } catch (error) {
            throw (error)   
        }
    }
    async updateQuantityProdToCart(cid, pid, quantity){
        try {
            const cart = await this.#getCartById(cid)
            let product = cart.products.find(p=>p.product==pid)
            if(!product) throw new Error(`Product ID ${pid} not found in Cart ID ${cid} `)
            product.quantity= quantity
            await cart.save()
            return 'The quantity product updated correctly!!'
        } catch (error) {
            throw (error)   
        }
    }
    async deleteAllProductsToCart(cid){
        try {
            const cart = await this.#getCartById(cid)
            if (!cart.products.length) throw new Error('The cart was already empty')
            cart.products= []
            cart.save()
            return 'The cart emptied correctly!!'
        } catch (error) {
            throw (error)   
        }
    }
}
const daoCart = new DaoCarts()

export default daoCart

