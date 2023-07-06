import fs from 'fs'

class DaoCarts {
    constructor(pathCarts){
        this.pathCarts=pathCarts
    }
    async #getCarts(){
        try {
            if (fs.existsSync(this.pathCarts)) {
                const file = await fs.promises.readFile(this.pathCarts, 'utf-8')
                let fileParse = JSON.parse(file)
                return fileParse
            }else{
                return []
            }
        } catch (error) {
            throw (error)    
        }
    }
    async #getCartById(id){
        try {
            let carts = await this.#getCarts() // return =>[{...}] || []
            console.log('carts', carts)
            let cart = carts.find(c=>c.id==id) // return {...} || undefined
            console.log('cart', cart)
            if (!cart) throw new Error('Nonexistent cart!')
            return cart
        } catch (error) {
            throw (error)    
        }
    }
    async addCart(){
        try {
            const arrayCart = await this.#getCarts()
            let newId;
            !arrayCart.length? newId= 1 : newId=  arrayCart[arrayCart.length-1].id+1
            let newCart = {id:newId, products:[]}
            arrayCart.push(newCart)

            await fs.promises.writeFile(this.pathCarts, JSON.stringify(arrayCart))
            console.log(arrayCart)
            return newCart            
        } catch (error) {
            throw (error)   
        }
    }
    async getProdToCart(id){
        try {
            return await this.#getCartById(id)
        } catch (error) {
            throw (error)   
        }
    }
    async addProductToCart(cid, pid){
        try {
            let carts = await this.#getCarts()
            let indexCart =carts.findIndex(c=>c.id==cid)
            if(indexCart == -1) throw new Error ('Nonexistent cart!')

            let indexProd = carts[indexCart].products.findIndex(p=>p.id==pid)
            if (indexProd != -1) {
                carts[indexCart].products[indexProd].quantity+=1 
            } else {
                carts[indexCart].products.push({
                    product: Number(pid),
                    quantity:1
                })
            }
            await fs.promises.writeFile(this.pathCarts, JSON.stringify(carts))
            return carts[indexCart]
        } catch (error) {
            throw (error)   
        }
    }
}
const daoCart = new DaoCarts( './src/daos/FileSystem/db/carritos.json')

export default daoCart

