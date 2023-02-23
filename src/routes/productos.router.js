import {Router} from 'express'
import Contenedor from '../daos/contenedor.js'
import __dirname, { uploader } from '../utils.js'
import { admin } from '../app.js'
import { PERSISTENCIA, productManager } from '../daos/index.js'
const router = Router()

const pathToFileP = __dirname + '/files/productos.json' 
let contenedor3 = new Contenedor(pathToFileP)
let productMongo = new productManager

router.get('/',async (req,res)=>{   //-------------> DEVUELVE TODOS LOS PRODUCTOS
    if(PERSISTENCIA==="FILESYSTEM"){
        let productos = await contenedor3.getAll()
        res.send(productos)
    }else{
        let data = await productMongo.getAll()
        res.send(data)
    }
})

router.get('/random', async(req,res)=>{
    if(PERSISTENCIA==="FILESYSTEM"){
        let productos = await contenedor3.getAll()
        let rand = ~~(Math.random() * productos.length);
        let rValue = productos[rand];
        res.send(rValue)
    }else{

        let productos = await productMongo.getAll()
        let rand = ~~(Math.random() * productos.products.length);
        let rValue = productos.products[rand];
        res.send(rValue)
    }
})

router.get('/:id',async (req,res)=>{   //-------------> DEVUELVE 1 PRODUCTO SEGUN SU ID
    let id = req.params.id

    if(PERSISTENCIA==="FILESYSTEM"){
        let obj = await contenedor3.getProductById(id)
        if(!obj) res.send({ error: "No se encontró el ID"})
        res.send(obj)
    }else{
        let data = await productMongo.getProductsById(id)
        res.send(data)
    }
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
            const newImage = req.protocol+"://"+req.hostname+':8080/img/'+req.file.filename;
                            //HTTPS      + ://+ LOCALHOST O SERVER+8080 +   NOMBRE NUEVO DE ARCHIVO 
            product.img = newImage

            if(PERSISTENCIA==="FILESYSTEM"){
                await contenedor3.save(product)
                // res.redirect('/');
                res.send({status:"success",payload:product});
                // console.log(req.file)
            }else{
                await productMongo.save(product)
                res.send({status:"success",payload:product});
            }
    }else {
        console.log("post err")
        res.send({status:"error",message:"metodo no autorizado"});
    }

})

router.put('/:id',async (req,res)=>{   //-------------> recibe y actualiza un producto según su id.
    if(admin){
        let id = req.params.id
        const objBody = req.body
        
        if(PERSISTENCIA==="FILESYSTEM"){
            let result = await contenedor3.updateItem(objBody, id)
            res.send(result)
        }else{
            let updateItem = await productMongo.updateItem(objBody, id)
            res.send(updateItem)
        }
    }else{
        res.send({status:"error", message:"no puede acceder a este metodo put"})
    }
})

router.delete('/:id',async (req,res)=>{   //-------------> elimina un producto según su id.
    if(admin){

        if(PERSISTENCIA==="FILESYSTEM"){
            let id = parseInt(req.params.id)
            contenedor3.deleteById(id)
            res.send(`Producto con ID:${id} se elimnó con exito`)
        }else{
            let id = req.params.id
            let data = await productMongo.deleteById(id)
            res.send(data)
        }
    }else res.send({status:"error", message:"no puede acceder a este metodo delete"})
})

export default router;