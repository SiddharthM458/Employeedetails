import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  public name!: string

  @column()
  public designation!: string

  @column()
  public email!: string

  @column()
  public phonenumber!: number

  @column()
  public salary!: number


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
} 