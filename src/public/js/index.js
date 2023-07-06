/* -------------------------------------------------------------------------- */
/*                                 WEBSOCKETS                                 */
/* -------------------------------------------------------------------------- */
const socket = io.connect()

const form = document.getElementById('form')
const tbody = document.getElementById('tbody')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const newProduct= {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value,
        code: document.getElementById('code').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
        status:true,
    }
    socket.emit('messageClient',newProduct)
})
socket.on('messageServer',data=>{
    console.log('data', data)
    const i = data.map(p=>{
        return ( `<tr class='trCart'>
        <td>${p.title}</td>
        <td>${p.description}</td>
        <td>${p.price}</td>
        <td>${p.stock}</td>
        <td>${p.category}</td>
    </tr>`)
    })
    tbody.innerHTML=i.join('')
})

/* ---------------- FUNCION PARA AGRGAR PRODUCTOS AL CARRITO ---------------- */

async function agregarAlCarrito(pid) {
    //1° VEZ SE CREA UN CARRITO Y SE GUARDA EL ID EN localStorage
    //2° en adelante SE TOMA ESE ID PARA NO VOLVER A CREARLO

    let idCart =localStorage.getItem('idCart')
   if( !localStorage.getItem('idCart')){
    //CREACION DE CARRITO
       let response = await fetch(`/api/carts/`,{
           method: 'POST'
         })
       let newCart = await response.json()
       idCart =newCart._id
       //GUARDADO DE ID DE CARRITO PARA EL RESTO DE PETICIONES
       localStorage.setItem('idCart', idCart)
       alert ('Carrito creado ok')
   }
    console.log(idCart)
   //SE AGREGA PRODUCTO
    let prod = await fetch(`/api/carts/${idCart}/product/${pid}`,{
        method: 'POST'
      })
      prod = await prod.json()
      console.log(prod)
      alert('producto agregado!!')
}
async function goToCart(params) {
    fetch(`http://localhost:8080/api/carts/`,{
        method: 'POST'
      })}
            
            