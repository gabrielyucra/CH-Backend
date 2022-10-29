import express from 'express'
import Contenedor from '../desafio2/contenedor.js'
import fs from 'fs'

const app = express(); //inciar el aplicativo
const server = app.listen(8080,()=>console.log("Te estoy escuchando MABEL")) //Poner al aplicativo a escuchar

let contenedor2 = new Contenedor("../desafio2/productos.json")

app.get('/productos',async (req,res)=>{
    // let productos = await contenedor2.getAll()

    // prod 

    let data = await fs.promises.readFile("../desafio2/productos.json", "utf-8")
    let prod = JSON.parse(data)



    console.log(prod+'prod')
    res.send(prod+'ola')
})

app.get('/productosRandom',(req,res)=>{
    res.send("ragnar")
})

