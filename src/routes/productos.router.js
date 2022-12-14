import {Router} from 'express'
import Contenedor from '../contenedor.js'
import { uploader } from '../utils.js'

const router = Router()

let contenedor3 = new Contenedor("./productos.json")

router.get('/gg', (req, res)=>{
    res.render("ss")
})


router.get('/',async (req,res)=>{   //-------------> DEVUELVE TODOS LOS PRODUCTOS
    let productos = await contenedor3.getAll()
    res.send(productos)
})

router.get('/random', async(req,res)=>{
    let productos = await contenedor3.getAll()
    let rand = ~~(Math.random() * productos.length);
    let rValue = productos[rand];
    res.send(rValue)
})

router.get('/:id',async (req,res)=>{   //-------------> DEVUELVE 1 PRODUCTO SEGUN SU ID
    let id = req.params.id
    let obj = await contenedor3.getById(id)
    if(!obj) res.send({ error: "No se encontró el ID"})
    res.send(obj)
})

router.post('/',uploader.single("img"), async (req,res)=>{   //-------------> recibe y agrega un producto, y lo devuelve con su idasignado.
    const {title, price, img} = req.body;
    // if(!title || !price || !img) res.status(400).send({status:"error", error:"campos incompletos"})
    const product = {
        title,
        price,
        img
    }
    // console.log(req.file)
    const newImage = req.protocol+"://"+req.hostname+':8080/img/'+req.file.filename;
                    //HTTPS      + ://+ LOCALHOST O SERVER+8080 +   NOMBRE NUEVO DE ARCHIVO 
    product.img = newImage
    await contenedor3.save(product)
    res.redirect('/');
    res.send({status:"success",payload:product});
})

router.put('/:id',async (req,res)=>{   //-------------> recibe y actualiza un producto según su id.
    let id = parseInt(req.params.id)
    const objBody = req.body

    let result = await contenedor3.updateItem(objBody, id)
    res.send(result)
    
})

router.delete('/:id',async (req,res)=>{   //-------------> elimina un producto según su id.
    let id = parseInt(req.params.id)
    contenedor3.deleteById(id)
    res.send(`Producto con ID:${id} se elimnó con exito`)
})

export default router;