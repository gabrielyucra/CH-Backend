import { Router } from "express";
import CartContenedor from "../daos/cartContenerdor.js";
import { fechaHora } from "../daos/cartContenerdor.js";
import { PERSISTENCIA, cartManager } from "../daos/index.js";

const router = Router();
const contenedorCarrito = new CartContenedor()
const cartMongo = new cartManager

router.post('/', async (req, res) => {
    if(PERSISTENCIA==="FILESYSTEM"){
        const newCart = await contenedorCarrito.createCart(fechaHora())
        res.send({ status: "success", payload: newCart })
    }else{
        let data = await cartMongo.createCart()
        res.send(data)
    }
})

router.delete('/:cid', async (req, res) => {
    const id = req.params.cid

    if(PERSISTENCIA==="FILESYSTEM"){
        const cart = await contenedorCarrito.cleanCartById(id)
        res.send(`Se limpio el carrito de id ${id}`)
    }else{
        let data = await cartMongo.cleanCartById(id)
        res.send(data)
    }
})

router.get('/:cid/products', async (req, res) => {
    const id = req.params.cid
    
    if(PERSISTENCIA==="FILESYSTEM"){
        let cart = await contenedorCarrito.getCartById(id)
        let productos=cart.products
        res.send(productos)
    }else{
        let cart = await cartMongo.getCartById(id)
        let productos=cart.products
        res.send(productos)
    }
})

router.post('/:cid/products', async (req, res) => {
    const id = req.params.cid

    if(PERSISTENCIA==="FILESYSTEM"){
        const existsCart = await contenedorCarrito.exists(id)
        if (existsCart) {
        const product = req.body
        let productToInsert = await contenedorCarrito.addProduct(id, product)
        res.send(productToInsert)
        }   
        else {
            res.send({
                status: "error",
                error: "Cart not found"
            })
        }
    }else{
        const product = req.body
        let productToInsert = await cartMongo.addProduct(id, product)
        res.send(productToInsert)
    }
})

router.delete('/:cid/products/:pid', async (req, res) => {
    const carritoId = req.params.cid
    const productId = parseInt(req.params.pid)

    if(PERSISTENCIA==="FILESYSTEM"){
        const result = await contenedorCarrito.deleteProduct(carritoId, productId)
        res.send(result)
    }else{
        const data = await cartMongo.deleteProduct(carritoId, productId)
        res.send(data)
    }
})

export default router;