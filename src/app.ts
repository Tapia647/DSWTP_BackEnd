import express from 'express'  //permite crear servidores web y definir rutas fácilmente.
import { veterinaria } from './veterinaria.js' //Importa la clase veterinaria desde tu archivo veterinaria.js, para poder crear instancias de veterinarias.

const app = express()
app.use(express.json())
 
const veterinarias: veterinaria[] = [            //crea un array de veterinarias con datos de ejemplo
    new veterinaria('Veterinaria Patitas', 'Calle Falsa 123', '555-1234'),
    new veterinaria('Clinica Animalia', 'Avenida Siempre Viva 742', '555-5678')
]

app.get('/api/veterinarias', (req, res) => {  //Define una ruta GET en /api/veterinarias que devuelve la lista de veterinarias
    res.json(veterinarias)               //Ruta GET, es decir, algo que se ejecuta cuando alguien hace una petición GET a tu servidor. /api/veterinarias' es la URL
})

app.get('/api/veterinarias/:id', (req, res) => {  //Define una ruta GET  para obtener una veterinaria por su ID
    const veterinaria = veterinarias.find(veterinaria => veterinaria.id === req.params.id)
    if (veterinaria) {
        res.json(veterinaria)
    } else {
        res.status(404).send({ message: 'Veterinaria no encontrada' })
    }
})

app.post('/api/veterinarias', (req, res) => {   //Define una ruta POST para agregar una nueva veterinaria
  const {nombre,direccion,telefono} = req.body //Destructuración: extraemos los datos del body; Toma los datos enviado y los guarda en variables para usarlos.
  const nuevaVet = new veterinaria(nombre,direccion,telefono) //crea una nueva instancia de veterinaria con los datos extraídos
  veterinarias.push(nuevaVet) //agrega la nueva veterinaria al array
  res.status(201).send({message: 'Veterinaria agregada', data : nuevaVet}) //201 es el codigo de creado

})

app.put('/api/veterinarias/:id', (req, res) => { //Define una ruta PUT para actualizar una veterinaria existente
  const veterinariaID = veterinarias.findIndex(veterinaria => veterinaria.id === req.params.id) //busca la veterinaria por su ID y devuelve la posición (índice) 
  if (veterinariaID !== -1) { //si la encuentra         veterinaria.id === req.params.id: Compara el ID de cada veterinaria con el ID que viene en la URL
    const {nombre,direccion,telefono} = req.body //extrae los datos del body
    veterinarias[veterinariaID] = { ...veterinarias[veterinariaID], nombre, direccion, telefono } //actualiza los datos de la veterinaria   el operador ... es el operador de propagación (spread operator) que crea una copia del objeto existente.
    res.status(200).send({message: 'Veterinaria actualizada', data: veterinarias[veterinariaID]})                                  // es decir copia los datos datos viejos y hace un merge con los nuevos datos.
  } else {
    res.status(404).send({ message: 'Veterinaria no encontrada' })
  }
})

app.listen(3000, () => { //inicia el servidor en el puerto 3000.
  console.log('Servidor corriendo en http://localhost:3000')
})

