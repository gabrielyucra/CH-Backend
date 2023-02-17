import { Router } from "express";
import CartContenedor from "../daos/cartContenerdor.js";
import { fechaHora } from "../daos/cartContenerdor.js";

const router = Router();
const contenedorCarrito = new CartContenedor()

router.post('/', async (req, res) => {
        const newCart = await contenedorCarrito.createCart(fechaHora())
        res.send({ status: "success", payload: newCart })
})

router.delete('/:cid', async (req, res) => {
        const id = parseInt(req.params.cid)
        const cart = await contenedorCarrito.cleanCartById(id)
        res.send(`Se limpio el carrito de id ${id}`)
})

router.get('/:cid/products', async (req, res) => {
    const id = parseInt(req.params.cid)
    let cart = await contenedorCarrito.getCartById(id)
    let productos=cart.products
    res.send(productos)
})

router.post('/:cid/products', async (req, res) => {
    const id = parseInt(req.params.cid)
    const existsCart = await contenedorCarrito.exists(id)
    if (existsCart) {
        const product = req.body
        let productToInsert = await contenedorCarrito.addProduct(id, product)
        res.send(productToInsert)
    }
    else{
        res.send({
            status: "error",
            error: "Cart not found"
        })
    }
})

router.delete('/:cid/products/:pid', async (req, res) => {
    const carritoId = parseInt(req.params.cid)
    const productId = parseInt(req.params.pid)
    const result = await contenedorCarrito.deleteProduct(carritoId, productId)
    res.send(result)
})

export default router;