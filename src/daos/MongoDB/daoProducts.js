import { ModelProducts } from "./models/modelProducts.js"

class DaoProducts {
    async addProduct(product){
        try {
            const newProduct = await ModelProducts.create(product)
            
            return newProduct
        } catch (error) {
            throw (error)   
        }
    }
    async getProducts(limit=10, page=1, sort, query={},value){
        try {
            //"query" trae un objeto con todos los filtros de campos que puse en los query params
            //asi se puede filtrar por el campo que quera (title, category, stock, etc) e incluso usar varios a la vez, si viene vacio trae todo.

            console.log('sort', sort, 'limit', limit, 'page', page, 'query',query)
            //Si el query params p/ ordenar ('sort') viene vacio no se ordena, con 1 ó -1 se ordena por precio
            const order= sort?{price:sort}:null
            const response = await ModelProducts.paginate(query,{page,limit, sort:order})

            //Iniciando con la  ruta http://localhost:8080/products en el navegador puedo usar los botones Anterior" y "Siguiente" para ver todas las paginas. 

            //la Variable "search" de abajo se usa para tomar todos los campos de filtro guardados en "query" (que vienen de los query params) y armar las rutas de "prevLink" y "nextLink" con los mismos filtros de la primer peticion.
            let search = ''
            if (Object.entries(query).length) {
                for (const r in query) {
                    search +=`${r}=${query[r]}&`
                }
            }
            const newResponse= {
                status: response.docs.length?'success':'error',
                payload: response.docs,
                totalPages: response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,                    
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink: response.hasPrevPage?`http://localhost:8080/products?${search}${order?'sort='+order.price:''}&limit=${limit}&page=${response.prevPage}`:null,
                nextLink: response.hasNextPage?`http://localhost:8080/products?${search}${order?'sort='+order.price+'&':''}limit=${limit}&page=${response.nextPage}`:null
            }
                return newResponse 
        } catch (error) {
            throw (error)   
        }
    }
    async getProductById(id){
        try {
            const product =  await ModelProducts.findById(id)
            if(!product) throw new Error(`Product ID ${id} Not found`)
            return product
        } catch (error) {
            throw (error)   
        }
    }
    async updateProduct(id, newProduct){
        try {
           const product=  await ModelProducts.findByIdAndUpdate(id, newProduct)
           if(!product) throw new Error(`Product ID ${id} Not found`)
           return (`Producto id ${id} modificado con exito`);
        } catch (error) {
            throw (error)   
        }
    }
    async deleteProduct(id){
        try { 
            const product= await ModelProducts.findByIdAndDelete(id)
            if(!product) throw new Error(`Product ID ${id} Not found`)
            return (`Producto id ${id} eliminado con exito`);
        } catch (error) {
            throw (error)   
        }
    }
}
const daoProducts = new DaoProducts('./src/daos/FileSystem/db/productos.json')

export default daoProducts