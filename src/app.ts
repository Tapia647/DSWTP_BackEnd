import express from 'express'
import { Character } from './character.js'
const app = express() //app es el resultado de ejecutare la funcion express
//get obtener rss
//get /api/name/:id  obtener id con id = :id
//post crear new rss
//delete
//put y patch modificar rss
// cada rss tiene que tener unsa url --> /api/name-de-rss/

const characters = [
  new Character(
    'Darth Vader',
    'Sith',
    10,
    100,
    20,
    10,
    ['Lightsaber', 'Death Star'],
    'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
  ),
]
app.get('/api/characters', (req, res) =>{
  res.json( characters )
})





//app.use('/', (req, res) => {
//  res.json({ message: 'hello!!' })
//}) //conteste todo lo que viene a la raiz, cualquier request que se hagade http a la raiz se ejecute el callback

app.listen(3000, () => {
  console.log('server running on http://localhost:3000/')
})  //puerto 3000
//pnpm start:dev para probar