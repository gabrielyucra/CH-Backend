import {fileURLToPath} from 'url';
import { dirname } from 'path';
import multer from 'multer';

const __filename  = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({       // Se almacena en nuestro proyecto 
    destination:function(req,file,cb){
        cb(null,__dirname+'/public/imag') //  Donde quiero que se guarde, el destino
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)// Cn q name se va a guardar mi archivo(fecha exacta seg - name original)
    }
})

export const uploader = multer({storage}) // Inicio multer y le indico donde almacenar todo

export default __dirname;