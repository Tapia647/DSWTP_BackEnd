import { Entity, Property, Cascade, OneToMany, Collection } from "@mikro-orm/core"
import { Animal } from "./animal.entity.js"
import { BaseEntity } from "../shared/db/baseEntity.entity.js"

@Entity()
export class Especie extends BaseEntity {

  @Property({nullable: false, unique: true})
  nombreEspecie!: string
  
  @OneToMany(() => Animal, animal => animal.especie, {
    cascade: [Cascade.ALL],
  })
  animales= new Collection<Animal>(this) //relacion uno a muchos con animales
}
