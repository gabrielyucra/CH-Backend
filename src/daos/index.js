import mongoose from 'mongoose';
import ProductsContenedor from "./contenedor.js";
import CartContenedor from "./cartContenerdor.js";
import CartMongo from "./cartsMongoContainer.js";
import ProductMongo from "./productsMongoContainer.js";


const PERSISTENCIA = "FILESYSTEM" // Elegir FILESYSTEM O MONGO

let productManager
let cartManager

if (PERSISTENCIA === "FILESYSTEM") { 
    productManager = ProductsContenedor
    cartManager= CartContenedor
    
    console.log("Conectado a Filesystem")
    
} else { 
    productManager = ProductMongo
    cartManager = CartMongo

    const baseElegida = "basecoder"

    const connection = mongoose.connect(`mongodb+srv://gabrielyucra:InPe2023ñ@codercluster.9eir9ur.mongodb.net/${baseElegida}?retryWrites=true&w=majority`, err => {
        if (err) console.log(err)
        else console.log("Conectado a Mongo")
    })
}

export { productManager, cartManager} 