import { MikroORM } from "@mikro-orm/core"
import { SqlHighlighter } from "@mikro-orm/sql-highlighter"
import { MySqlDriver } from "@mikro-orm/mysql" // <--- IMPORTANT

export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'fundacion',
  //type: 'mysql',
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
  await generator.dropScyhema()
  await generator.createSchema()
  */
 await generator.updateSchema()
}
