import express from 'express'
import Contenedor from './contenedor.js'
import fs from 'fs'

const app = express(); //inciar el aplicativo
const server = app.listen(8080,()=>console.log("Te estoy escuchando MABEL")) //Poner al aplicativo a escuchar

let contenedor2 = new Contenedor("./productos.json")

app.get('/productos',async (req,res)=>{
    let productos = await contenedor2.getAll()
    res.send(productos)
})

app.get('/productosRandom', async(req,res)=>{
    let productos = await contenedor2.getAll()
    let rand = ~~(Math.random() * productos.length);
    let rValue = productos[rand];
    res.send(rValue)
})

