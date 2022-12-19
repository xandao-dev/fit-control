import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm';

export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(teacher: Teacher) {
    if (teacher.$dirty.password) {
      teacher.password = await Hash.make(teacher.password);
    }
  }
}
