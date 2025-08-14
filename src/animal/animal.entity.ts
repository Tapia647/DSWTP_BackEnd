import { Entity, Property, Cascade, ManyToOne, Collection, Rel} from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { Especie } from "./especie.entity.js"
//preguntar por el type a en property
@Entity()
export class Animal extends BaseEntity {

  @Property({ nullable: false })
  nombreAnimal!: string

  @ManyToOne(() => Especie, { nullable: false })
  especie!: Rel<Especie>

  @Property()
  Tamaño!: string

  @Property()
  descripcion!: string

  @Property()
  edad!: number

  //fecha rescate
}  