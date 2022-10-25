class Usuario{
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = []
        this.mascotas = []
    }
    getFullName= ()=>{
        //Retorna el completo del usuario. Utilizar template strings.
        return (`${this.nombre} ${this.apellido}`)
    } 

    addMascota=(mascotaName)=>{
        //Recibe un nombre de mascota y lo agrega al array de mascotas.
        this.mascotas.push(mascotaName)
    }

    countMascotas= ()=>{
        //Retorna la cantidad de mascotas que tiene el usuario
        return this.mascotas.length
    }

    addBook= (nombre, autor)=>{
        //Recibe un string 'nombre' y un string 'autor' y
        //debe agregar un objeto: { nombre: String, autor: String } al array de libros.
        const libro = {
            "nombre" : nombre,
            "autor" : autor
        }
        this.libros.push(libro)
    }

    getBookNames= ()=>{
        //Retorna un array con sólo los nombres del array de libros del usuario.
        return this.libros.map(e=>e.nombre)
    }
}

const usuario1= new Usuario("gabriel", "yucra")

const nombreCompleto = usuario1.getFullName()
console.log(`Hola soy ${nombreCompleto}`);

usuario1.addMascota("poli")
usuario1.addMascota("loki")
usuario1.addMascota("mishu")
usuario1.addMascota("chiqui")

const cantPet = usuario1.countMascotas()

console.log(`Tengo ${cantPet} mascotas (${usuario1.mascotas})`)

usuario1.addBook("Titán del gol y de la vida", "Martin Palermo")
usuario1.addBook("Juego de tronos", "George Martin")
usuario1.addBook("Wiggeta", "Vegetta777 y Willyrex ")

console.log(usuario1.libros)
console.log(`Mis libros favoritos son: ${usuario1.getBookNames()} (?`)