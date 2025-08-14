//borrar es para cuando no se usa mikro-orm
//referencia al acceso a la base de datos. usar patron datamaper en orm
export interface Repository<T>{
  findAll(): T[] //| undefined
  findOne(item: {id: string}): T | undefined
  add(item: T): T | undefined
  update(item: T): T | undefined
  delete(item: T): T | undefined
}