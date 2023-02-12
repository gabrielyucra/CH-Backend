import {Router} from 'express'
import Contenedor from '../contenedores/contenedor.js'
import __dirname, { uploader } from '../utils.js'
import { admin } from '../app.js'
const router = Router()

const pathToFileP = __dirname + '/files/productos.json' 
let contenedor3 = new Contenedor(pathToFileP)

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
    if(admin){
        const {title, description, stock, price, img} = req.body;
        const product = {
            title,
            description,
            stock,
            price,
            code: Math.floor(Math.random()*9999),
            img
        }
        // console.log(req.file)
        const newImage = req.protocol+"://"+req.hostname+':8080/img/'+req.file.filename;
                        //HTTPS      + ://+ LOCALHOST O SERVER+8080 +   NOMBRE NUEVO DE ARCHIVO 
        product.img = newImage
        await contenedor3.save(product)
        // res.redirect('/');
        res.send({status:"success",payload:product});
    }else {
        console.log("post err")
        res.send({status:"error",message:"metodo no autorizado"});
    }

})

router.put('/:id',async (req,res)=>{   //-------------> recibe y actualiza un producto según su id.
    if(admin){
        let id = parseInt(req.params.id)
        const objBody = req.body
        
        let result = await contenedor3.updateItem(objBody, id)
        res.send(result)
    }else{
        res.send({status:"error", message:"no puede acceder a este metodo put"})
    }
})

router.delete('/:id',async (req,res)=>{   //-------------> elimina un producto según su id.
    if(admin){
        let id = parseInt(req.params.id)
        let prods = await contenedor3.getAll()
        let findProd= prods.find(prod=> id===prod.id)
        if(findProd){
            contenedor3.deleteById(id)
            res.send(`Producto con ID:${id} se elimnó con exito`)
        }else{
            res.send("error con el id")
        }
    }else res.send({status:"error", message:"no puede acceder a este metodo delete"})

})

export default router;