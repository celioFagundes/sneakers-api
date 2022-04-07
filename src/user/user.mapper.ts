import { UserCreateInput } from './dto/user_create.input'
import { UserUpdateInput } from './dto/user_update.input'
import { User } from './user.entity'

export class UserMapper {
  public static toEntity(input: UserCreateInput): User {
    const entity = new User()
    entity.username = input.username
    entity.email = input.email
    entity.password = input.password
    return entity
  }
  public static toEntityUpdate(input: UserUpdateInput): User {
    const entity = new User()
    entity.id = input.id
    entity.username = input.username
    return entity
  }
}
