import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Employees extends BaseSchema {
  protected tableName = 'employees'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name')
      table.string('designation').unique()
      table.string('email').unique()
      table.integer('phonenumber')
      table.integer('salary') 

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())

    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}