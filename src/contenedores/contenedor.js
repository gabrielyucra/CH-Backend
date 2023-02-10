import fs from 'fs'

class Contenedor{
    constructor(fileName){
        this.fileName = fileName
    }

    readProd=async()=>{
        let data = await fs.promises.readFile(this.fileName,'utf-8')
            let products =  JSON.parse(data)
            return products
    }

    save = async (obj)=>{
        // Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        try{
            let data = await fs.promises.readFile(this.fileName,'utf-8')
            let products =  JSON.parse(data)

            const id = products.length+1
            obj = Object.assign({id: id}, obj);
            products.push(obj)

            await fs.promises.writeFile(this.fileName, JSON.stringify(products, null, "\t"))
            return console.log("El id asignado es: "+obj.id)
        }catch{
            console.log("Hubo un error SAVE")
        }
    }

    getById= async (id)=>{
        // Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
        try {
            let data = await fs.promises.readFile(this.fileName, 'utf-8')
            let products = JSON.parse(data)

            let getId = products.find(products => products.id == id)
            return getId
        }catch {
            console.log("3rror GETBYID")
        }
    }

    getAll = async ()=>{
        // Object[] - Devuelve un array con los objetos presentes en el archivo.
        try{
            let data = await fs.promises.readFile(this.fileName, "utf-8")
            let prod = JSON.parse(data)
            return prod
        }catch{
            console.log("Hubo un error GETALL");
        }
    }

    deleteById = async (id)=>{
        // Elimina del archivo el objeto con el id buscado.
        try{
            let data = await fs.promises.readFile(this.fileName,'utf-8')
            let products = JSON.parse(data)
    
            let newProducts = products.filter(products=>products.id !== id)
            await fs.promises.writeFile(this.fileName, JSON.stringify(newProducts, null, "\t"))
        }catch{
            return console.error("\nHay un error DELETEID\n")
        }
    }

    deleteAll = async()=>{
        // Elimina todos los objetos presentes en el archivo.
        try{
            await fs.promises.writeFile(this.fileName,'[]')
        }catch{
            console.log("Hubo un error DELETEALL")
        }
    }

    updateItem = async (obj, id) => {
        let products = await this.getAll()
        try {
            let arrayProducts = products.map(product => {
                if (product.id == id) {
                    return {
                        id: product.id,
                        title: obj.title ? obj.title : product.title,
                        descripion: obj.descripion ? obj.descripion : product.descripion,
                        stock: obj.stock ? obj.stock : product.stock,
                        price: obj.price ? obj.price : product.price,
                        img: obj.img ? obj.img : product.img
                    }
                } else {
                    return product
                }
            })
            let productUpdate = arrayProducts.find(product => product.id == id)
            if (productUpdate) {
                await fs.promises.writeFile(this.fileName, JSON.stringify(arrayProducts, null, 2))
                return {
                    status: "success",
                    message: "successfully upgraded product",
                    productNew: productUpdate
                }
            } else {
                return {
                    status: "error",
                    message: "Product not found"
                }
            }
        } catch {
            return {
                status: "error",
                message: "It's not possible to update the product"
            }
        }
    }

}
export default Contenedor;