const fs = require("fs")

class Product{
    constructor(title, price, thumbnail){
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}

class Contenedor{
    constructor(fileName){
        this.fileName = fileName
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
            console.log("Hubo un error")
        }
    }

    getById= async (id)=>{
        // Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
        try {
            let data = await fs.promises.readFile(this.fileName, 'utf-8')
            let products = JSON.parse(data)


            let getId = products.find(products => products.id == id)
            return console.log(getId)
        }catch {
            return console.log("null")
        }
    }

    getAll = async ()=>{
        // Object[] - Devuelve un array con los objetos presentes en el archivo.
        try{
            let data = await fs.promises.readFile(this.fileName,'utf-8')
            return console.log(JSON.parse(data))
        }catch{
            console.log("Hubo un error");
        }
    }

    deleteById = async (id)=>{
        // Elimina del archivo el objeto con el id buscado.
        try{
            let data = await fs.promises.readFile(this.fileName,'utf-8')
            let products = JSON.parse(data)
    
            if(id) {
                let newProducts = products.filter(products=>products.id !== id)
                await fs.promises.writeFile(this.fileName, JSON.stringify(newProducts, null, "\t"))
            }
        }catch{
            console.error("\nEL ID INGRESADO NO EXISTE\n")
        }
    }

    deleteAll = async()=>{
        // Elimina todos los objetos presentes en el archivo.
        try{
            await fs.promises.writeFile(this.fileName,'[]')
        }catch{
            console.log("No se pudo eliminar el array")
        }
    }
}

const contenedor1 = new Contenedor("./productos.json")

const producto1 = new Product("celular", 10000, "imagen")
const producto2 = new Product("zapatilas", 5000000, "gg")

// contenedor1.save(producto1)
// contenedor1.save(producto2)

// console.log(contenedor1.getById(4))
// console.log(contenedor1.getAll())
// contenedor1.deleteById(3)
// console.log(contenedor1.getAll())

// contenedor1.deleteAll()


let a =contenedor1.getById(7)
// console.log(a)
