import express from 'express'
import 'dotenv/config'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars'
import __dirname from "./utils.js";
import { routerProducts } from "./src/routes/routerProducts.js";
import { routerCarts } from "./src/routes/routerCarts.js";
import { routerViews } from "./src/routes/routerViews.js";
import { routerSessions } from "./src/routes/routerSessions.js";
import { Server } from "socket.io";
import { errorHandler } from './src/middleware/errorHandler.js';
if(process.env.PERSISTENCIA=='MongoDB') import('./src/daos/MongoDB/db/connectionMongo.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname +'/src/public'))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname +'/src/views')
app.set('view engine', 'handlebars')

let mongoUrl =process.env.MONGO_ATLAS
if (process.env.NODE_ENV=='development') mongoUrl ='mongodb://localhost:27017/ecommerceLocal'

app.use(session({
    secret:'1234',
    saveUninitialized:false,
    resave:true,
    store: new MongoStore({
        mongoUrl,
        mongoOptions:{useNewUrlParser:true, useUnifiedTopology:true},
        //ttl:5
    })
}))

app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/api/sessions', routerSessions)
app.use('/', routerViews)
app.all('*', (req, res, next)=>res.status(404).json('Invalid path'))
app.use(errorHandler)

const PORT  = 8080
const server = app.listen(PORT,()=>{
    console.log('Escuchando en puerto ' + server.address().port)
}).on('error',err=>console.log('Fallo el servidor',err))

export const io = new Server(server)


