import {Router} from 'express'
import Contenedor from '../contenedor.js'
const router = Router()

let contenedor4 = new Contenedor("./productos.json");

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