import { Request, Response } from "express"
import { orm } from "../shared/db/orm.js"
import { Especie } from "./especie.entity.js"

const em = orm.em

async function findAll(req: Request, res: Response) {
  try{ 
    const especies = await em.find('Especie', {})
    res.status(200).json({message: 'finded all especies', data: especies})
  } catch(error: any){
    res.status(500).json({message: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  res.status(500).json({message: 'not implemented '})
}

//zanetizar body
async function add(req: Request, res: Response) {
  try{
    const especie = em.create(Especie, req.body)
    await em.flush()
    res.status(201).json({ message: 'especie created', data: especie})
  } catch(error: any){
    res.status(500).json({message: error.message})
  }
}