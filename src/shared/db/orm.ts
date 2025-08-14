import { MikroORM } from "@mikro-orm/core"
import { SqlHighlighter } from "@mikro-orm/sql-highlighter"
import { MySqlDriver } from "@mikro-orm/mysql" // <--- preguntar a profesor

export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'fundacion',
  //type: 'mysql',
  driver: MySqlDriver, // <--- preguntar a profesor
  clientUrl: 'mysql://fundacion:fundacion123@localhost:4000/fundacion',
  highlighter: new SqlHighlighter(),
  debug: true,
  schemaGenerator: { //solo en desarrollo
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema:[],
  },
})

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator()
  /*
  await generator.dropSchema()
  await generator.createSchema()
  */
 await generator.updateSchema()
}
