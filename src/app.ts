import 'reflect-metadata' 
import express from 'express'
import { Especie }  from './animal/especie.entity.js'
import { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'


const app = express()
app.use(express.json()) 

//middleware despues de
app.use(( req, res, next ) => {
  RequestContext.create(orm.em, next)
} )
//antes de middleware de negocio

//app es el resultado de ejecutare la funcion express
//get obtener rss
//get /api/name/:id  obtener id con id = :id
//post crear new rss
//delete
//put y patch modificar rss
// cada rss tiene que tener una url --> /api/name-de-rss/

app.use ((_, res) => {
  return res.status(404).send({ message: 'rescource not found' })
}) //middleware de error, si no se encuentra el recurso

await syncSchema() //sincronizar el esquema de la base de datos, solo desarrollo





app.listen(3000, () => {
  console.log('server running on http://localhost:4000/')
})  //puerto 3000
//pnpm start:dev para probar