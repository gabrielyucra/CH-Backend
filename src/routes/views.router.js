import {Router} from 'express'
import Contenedor from '../daos/contenedor.js'
import __dirname from '../utils.js';
const router = Router()

const pathToFileP =__dirname+"/files/productos.json"
let contenedor4 = new Contenedor(pathToFileP);

router.get('/productos',async (req, res)=>{
    let productos = await contenedor4.getAll()
    if(productos.length>0){
        res.render("productos.handlebars",{
            title: "Products",
            productos
        })
    }else{
        res.render("productos.handlebars",{
            mensaje: "No hay productos"
        })
    }
})

export default router;