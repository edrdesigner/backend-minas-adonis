import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateProducts extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 60)
      table.string('description')
      table.float('price', 6)
      table.float('discount', 6)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
