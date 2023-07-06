import fs from 'fs'
import productsList from './db/products.js'  

class DaoProducts {
    constructor(pathProducts){
        this.pathProducts=pathProducts
    }
    async addProduct(product){
        try {
                const arrayProd = await this.getProducts()
                let newId
                if (arrayProd.length) {
                    newId = arrayProd[arrayProd.length -1].id+1
                } else {
                    newId= 1
                }
                let newProduct = {...product,id:newId}
                arrayProd.push(newProduct)
                await fs.promises.writeFile(this.pathProducts, JSON.stringify(arrayProd))
                return newProduct
        } catch (error) {
            throw (error)   
        }
    }
    async getProducts(limit){
        try {
            if (fs.existsSync(this.pathProducts)) {
                const file = await fs.promises.readFile(this.pathProducts, 'utf-8')
                const fileParse = JSON.parse(file)
                limit&&fileParse.splice(limit)
                return fileParse 
            }else{
                //para crear productos.json la primera vez desde el array de products.js
                for (let i = 0; i < productsList.length; i++) {
                    productsList[i].id =i +1
                }    
                await fs.promises.writeFile(this.pathProducts, JSON.stringify(productsList))
                limit&&productsList.splice(limit)
                return productsList
            }
        } catch (error) {
            throw (error)   
        }
    }
    async getProductById(id){
        try {
            const products = await this.getProducts()
            const producto = products.find(product=>product.id==id)
            if(!producto) throw new Error(`Product ID ${id} Not found`)
            return producto
        } catch (error) {
            throw (error)   
        }
    }
    async updateProduct(id, newProduct){
        try {
            const prod= await this.getProductById(id)
            const arrayProd = await this.getProducts()
            const updateArray = arrayProd.map( p => {
                if (p.id==id) p= {...p, ...newProduct}
                return p
            })
            await fs.promises.writeFile(this.pathProducts, JSON.stringify(updateArray))
            return (`Producto id ${id} modificado con exito`);
        } catch (error) {
            throw (error)   
        }
    }
    async deleteProduct(id){
        try {
            await this.getProductById(id)
            const arrayProduct = await this.getProducts()

            await fs.promises.writeFile(this.pathProducts, JSON.stringify( arrayProduct.filter(p=>p.id!=id)))
            return (`Producto id ${id} eliminado con exito`);
        } catch (error) {
            throw (error)   
        }
    }
}

const daoProducts = new DaoProducts('./src/daos/FileSystem/db/productos.json')

export default daoProducts

