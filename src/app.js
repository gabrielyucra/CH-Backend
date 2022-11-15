import express from 'express'
import Contenedor from './contenedor.js'
import Router from './routes/productos.router.js'
import  __dirname  from './utils.js';

const app = express(); //inciar el aplicativo
const server = app.listen(8080,()=>console.log("Te estoy escuchando MABEL")) //Poner al aplicativo a escuchar

app.use(express.json())// Le indico q quiero trabajar cn la estructura JSON//
app.use(express.urlencoded({extended:true}))// puede procesar datos mas complejos en la URL mas que nums, strings
app.use(express.static(__dirname + '/public'))

let contenedor2 = new Contenedor("./productos.json")

app.use('/api/productos', Router)






















////////////////////////////////////////////////////////////////////////////////////////
// let frase = "hola frase"





// app.get('/frase', (req,res)=>{
//     res.send({frase})
// })

// app.get('/palabra/:pos', (req,res)=>{
//     let pos = req.params.pos
//     let parsePos = parseInt(pos)
//     const words = frase.split(' ')
//     res.send({words: words[parsePos-1]})
// })

// app.post('/palabras', (req,res)=>{
//     const palabra = req.body.palabra
//     frase = frase.concat(` ${palabra}`)
//     res.send("post gg")
// })

// app.put('/palabras/:pos', (req, res)=>{
//     // let pos = req.params.pos
//     // let parsedPos = parseInt(pos);

//     // let newp = req.body.newpalabra
//     // const words = frase.split(' ');


//     // let oldp = words[pos-1]
//     // words[pos-1] = newp;
//     // frase = words.join(" ");
//     // res.send({palabraAnterior:oldp,palabraInsertada:newp});

//     let pos = req.params.pos;
//     const nuevaPalabra = req.body.newp;

//     const words = frase.split(' ');
//     const oldWord = words[pos-1];
//     words[pos-1] = nuevaPalabra;
//     frase = words.join(" ");
//     res.send({palabraAnterior: oldWord, palabraInsertada: nuevaPalabra});
// })