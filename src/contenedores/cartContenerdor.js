import fs from 'fs'
import __dirName from '../utils.js'

export const fechaHora = () => {
    const fh = new Date();
    const day = fh.getDate()
    const month = fh.getMonth()
    const year = fh.getFullYear()
    const hours = fh.getHours()
    const minutes = fh.getMinutes()
    const seconds = fh.getSeconds()
    return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`
}

class CartContenedor {

    constructor() {
        this.path = `${__dirName}/files/cart.json`
        this.init()
    }
    init = async () => {
        if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]))
    }
    readFile = async () => {
        try{
            let data = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(data);
        }
        catch{
            console.log("No se pudo leer el archivo de carritos")
        }
    }
    exists = async (id) => {
        let carts = await this.getCarts()
        return carts.some(cart => cart.id === id)
    }

    getCarts = () => {
            return this.readFile()
    }

    getCartById = async (id) => {
        try{
            const carts = await this.readFile()
            const cart = carts.find((cart) => cart.id === id)
            id<carts.length ? cart : console.log("ID no encontrado")
            return cart
        }
        catch{
            console.log("No se pudo encontrar el carrito")
        }
    }

    createCart = async (fecha) => {
        try{
            if (fecha) {
                const carts = await this.readFile()
                const newCart = {
                    id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1,
                    timestamp: fecha,
                    products: []
                }
                carts.push(newCart)
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))
                return newCart
            }
        }
        catch{
            console.log("no se pudo crear un nuevo carrito")
        }
    }
    
    
    cleanCartById = async (id) => {
        try{
            const carts = await this.readFile()
            if (carts.find(cart => cart.id === id)) {
                let newCart=carts.map(cart=>{
                    if(cart.id === id){
                        return{
                                id: cart.id,
                                timestamp: cart.timestamp,
                                products: []
                        }
                    }
                    else{
                        return cart;
                    }
                })
                await fs.promises.writeFile(this.path, JSON.stringify(newCart, null, '\t'))
            }else{
                console.log("Ingrese un ID valido")
            }
        }
        catch{
            console.log("no se pudo vaciar el carrito")
        }
    }

    addProduct = async (id, product) => {
        if (!id || !product) {
            return {
                status: "Error",
                message: "param is required"
            }}
        let carts = await this.readFile()
        let addedProduct;

        let newCarts = carts.map(cart => {
            if (cart.id === id) {
                return addedProduct = {
                    id: cart.id,
                    timestamp: cart.timestamp,
                    products: [...cart.products, {
                        id: product.id,
                        quantity: product.quantity
                    }]
                }
            } else {
                return cart
            }
        })
            await fs.promises.writeFile(this.path, JSON.stringify(newCarts, null, '\t'))
            return {status:"success",payload: addedProduct}
    }
    deleteProduct = async (cid, pid) => {
            let carts = await this.readFile()
            let newProducts = carts.map(cart => {
                if (cart.id === cid) {
                    let productos = []

                    cart.products.map(product => {
                        if (product.id != pid){
                            productos.push(product)
                        }
                    })
                    return {
                        id: cart.id,
                        timestamp: cart.timestamp,
                        products: productos
                    }
                } else {
                    return cart
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, '\t'))
            return newProducts
        
    }

}

export default CartContenedor;