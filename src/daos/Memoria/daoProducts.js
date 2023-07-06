class DaoProducts {
    constructor(){
        this.products=[]
    }
    addProduct(title,description,price, thumbnail,stock){
        if(title&&description&&price&& thumbnail&&stock){
            const newProduct = {
                title,
                description,
                price,
                thumbnail,
                stock,
                id:this.products.length + 1
            }
            this.products.push(newProduct)
            return newProduct
        }else{
            return 'Datos incompletos, intentelo nuevamente'
        }

    }
    getProducts(){
        return this.products
    }
    getProductById(id){
        const producto = this.products.find(product=>product.id==id)
        
        if(producto){
            return producto
        }else{
        return 'Not found'
        }
    }
}
export const daoProducts = new DaoProducts()
// PRUEBAS
//CARGA DE PRODUCTOS CORRECTAS
console.log(productos.addProduct('soda', 'La mas refrescante', 250, 'https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/productos/b/0000004000/4236.jpg',10))
console.log(productos.addProduct('AGUA', 'La mas TRANSPARENTE', 110, 'https://images/productos/b/0000004000/4226.jpg',10))

//CARGA DE PRODUCTO INCORRECTA (FALTAN CAMPOS)
console.log(productos.addProduct('jugo', '', 340, 'https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/4236.jpg',5))

//OBTENER TODOS LOS PRODUCTOS
console.log(productos.getProducts())

//OBTENER PRODUCTO POR ID (PRODUCTO EXISTENTE)
console.log(productos.getProductById(2))
//OBTENER PRODUCTO POR ID (PRODUCTO INEXISTENTE)
console.log(productos.getProductById(6))
