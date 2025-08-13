import { Repository } from "../shared/repository.js";
import { Especie } from "./especie.entity.js";

const especies = [
  new Especie(
    'perro',
    '123e4567-e89b-12d3-a456-426614174000',
  ),
]

export class EspecieRepository implements Repository<Especie>{
  public findAll(): Especie[] /*| undefined*/{
    return especies
  }
  public findOne(item: {id: string}): Especie | undefined {
    return especies.find(e => e.codEspecie === item.id)
  }

  public add(item: Especie): Especie | undefined {
    especies.push(item)
    return item
  }

  public update(item: Especie): Especie | undefined {
    const index = especies.findIndex(e => e.codEspecie === item.codEspecie)
    if (index !== -1) {
      especies[index] = item
      return item
    }
    return undefined
  }

  public delete(item: Especie): Especie | undefined {
    const index = especies.findIndex(e => e.codEspecie === item.codEspecie)
    if (index !== -1) {
      const [deleted] = especies.splice(index, 1)
      return deleted
    }
    return undefined
  }
}