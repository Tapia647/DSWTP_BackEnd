import express, { NextFunction, Request, Response } from 'express'  //permite crear servidores web y definir rutas fácilmente.
import { veterinaria } from './veterinaria.js' //Importa la clase veterinaria desde tu archivo veterinaria.js, para poder crear instancias de veterinarias.

const app = express()
app.use(express.json())
 
const veterinarias: veterinaria[] = [            //crea un array de veterinarias con datos de ejemplo
    new veterinaria('Veterinaria Patitas', 'Calle Falsa 123', '555-1234'),
    new veterinaria('Clinica Animalia', 'Avenida Siempre Viva 742', '555-5678')
]

//La sanitización de entradradas es limpiar y modificar los datos que proporciona el usuario para asegurarse de que sean seguros dentro de la aplicación, evitando vulnerabilidades
function sanitizeVeterinariaInput(req: Request, res: Response, next: NextFunction)  { 
  req.body.sanitizedData = {
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    telefono: req.body.telefono
  } 
  Object.keys(req.body.sanitizedData).forEach(key => { //Object.keys: obtiene un array con las claves del objeto. forEach: itera sobre cada clave
    if (req.body.sanitizedData[key] === undefined){ 
      delete req.body.sanitizedData[key]  //si el valor es undefined, null o cadena vacía, elimina esa clave del objeto}
    }
  })
  
  next() //Llama a la siguiente función en la cadena de middleware (middleware: función que se ejecuta entre la petición del cliente y la respuesta del servidor. Su trabajo es “interceptar” la solicitud y hacer algo antes de pasarla a la siguiente función o devolver una respuesta.)
}


app.get('/api/veterinarias', (req, res) => {  //Define una ruta GET en /api/veterinarias que devuelve la lista de veterinarias
    res.json(veterinarias)               //Ruta GET, es decir, algo que se ejecuta cuando alguien hace una petición GET a tu servidor. /api/veterinarias' es la URL
})

app.get('/api/veterinarias/:id', (req, res) => {  //Define una ruta GET  para obtener una veterinaria por su ID
    const veterinaria = veterinarias.find(veterinaria => veterinaria.id === req.params.id)
    if (veterinaria) {
        return res.json(veterinaria)
    } else {
        return res.status(404).send({ message: 'Veterinaria no encontrada' })
    }
})

app.post('/api/veterinarias', sanitizeVeterinariaInput, (req, res) => {   //Define una ruta POST para agregar una nueva veterinaria
  const {nombre,direccion,telefono} = req.body.sanitizedData //Destructuración: extraemos los datos del body; Toma los datos enviado y los guarda en variables para usarlos.
  const nuevaVet = new veterinaria(nombre,direccion,telefono) //crea una nueva instancia de veterinaria con los datos extraídos
  veterinarias.push(nuevaVet) //agrega la nueva veterinaria al array
  return res.status(201).send({message: 'Veterinaria agregada', data : nuevaVet}) //201 es el codigo de creado

})

app.put('/api/veterinarias/:id', sanitizeVeterinariaInput, (req, res) => { //Define una ruta PUT para actualizar una veterinaria existente
  const veterinariaID = veterinarias.findIndex(veterinaria => veterinaria.id === req.params.id) //busca la veterinaria por su ID y devuelve la posición (índice) 
  if (veterinariaID !== -1) { //si la encuentra      veterinaria.id === req.params.id: Compara el ID de cada veterinaria con el ID que viene en la URL
    veterinarias[veterinariaID] = { ...veterinarias[veterinariaID], ...req.body.sanitizedData } // el operador ... es el operador de propagación (spread operator) que crea una copia del objeto existente.
    return res.status(200).send({message: 'Veterinaria actualizada', data: veterinarias[veterinariaID]})                                  // es decir copia los datos datos viejos y hace un merge con los nuevos datos.
  } 
  else {
    return res.status(404).send({ message: 'Veterinaria no encontrada' })
  }
})


app.patch('/api/veterinarias/:id', sanitizeVeterinariaInput, (req, res) => { //Define una ruta PUT para actualizar una veterinaria existente
  const veterinariaID = veterinarias.findIndex(veterinaria => veterinaria.id === req.params.id) //busca la veterinaria por su ID y devuelve la posición (índice) 
  if (veterinariaID !== -1) { //si la encuentra      veterinaria.id === req.params.id: Compara el ID de cada veterinaria con el ID que viene en la URL
    veterinarias[veterinariaID] = { ...veterinarias[veterinariaID], ...req.body.sanitizedData } // el operador ... es el operador de propagación (spread operator) que crea una copia del objeto existente.
    return res.status(200).send({message: 'Veterinaria actualizada', data: veterinarias[veterinariaID]})                                  // es decir copia los datos datos viejos y hace un merge con los nuevos datos.
  } 
  else {
    return res.status(404).send({ message: 'Veterinaria no encontrada' })
  }
})


app.delete('/api/veterinarias/:id', (req, res) => {
  const vetID = veterinarias.findIndex(veterinaria => veterinaria.id === req.params.id) 
  if (vetID !== -1) {
    veterinarias.splice(vetID, 1) //splice: elimina un elemento del array en la posición dada por vetID
    return res.status(200).send({message: 'Veterinaria eliminada'})
  }
  else {
    return res.status(404).send({ message: 'Veterinaria no encontrada' })
  }
})

app.use((_, res) => { //Manejo de rutas no encontradas (404)
  return res.status(404).send({ message: 'Ruta no encontrada' })
}) //Esto atrapa todas las rutas que no coincidieron con las definidas antes (GET, POST, etc.) y devuelve un 404.

//Cuando un cliente hace una petición (request) al servidor, Express crea un objeto req con toda la info de esa petición.
//Express recorre todas las rutas y middlewares registrados, en el orden que los pusiste en el código.
//Para cada ruta/middleware, pregunta si coincide con el método y la URL de la petición:
//Si coincide → ejecuta la función de esa ruta.
//Si no coincide → pasa al siguiente middleware o ruta.
//Si llega al final y ninguna ruta coincidió, entonces ejecuta middleware de 404

app.listen(3000, () => { //inicia el servidor en el puerto 3000.
  console.log('Servidor corriendo en http://localhost:3000')
})

