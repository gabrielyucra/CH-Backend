import express from 'express'
import productsRouter from './routes/productos.router.js'
import viewsRouter from './routes/views.router.js'
import  __dirname  from './utils.js';
import handlebars from 'express-handlebars'
import cartRouter from './routes/carts.router.js';


const app = express(); //inciar el aplicativo
const server = app.listen(8080,()=>console.log("Te estoy escuchando MABEL")) //Poner al aplicativo a escuchar
export const admin = true;

// Motor de plantillas
app.engine('handlebars', handlebars.engine()) //Que motor va a registrar (nombre, motor correspondiente)
// Concetar con la carpeta de views
app.set('views',__dirname+'/views')
// Activo el motor q registré
app.set('view enigine', 'handlebars') // Mi ("motor de plantillas", va a ser 'nombre')


app.use(express.json())// Le indico q quiero trabajar cn la estructura JSON//
app.use(express.urlencoded({extended:true}))// puede procesar datos mas complejos en la URL mas que nums, strings
app.use(express.static(__dirname + '/public'))


app.use('/api/productos', productsRouter)
app.use('/api/carts', cartRouter) 
app.use('/', viewsRouter)