import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserCreateInput } from './dto/user_create.input'
import { UserPublic } from './dto/user_public'
import { UserUpdateInput } from './dto/user_update.input'
import { UserMapper } from './user.mapper'
import { UserService } from './user.service'

@Resolver(of => UserPublic)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(returns => [UserPublic], { name: 'getAllUsers' })
  async getAllUsers(): Promise<UserPublic[]> {
    return await this.userService.getAll()
  }
  @Mutation(returns => UserPublic, { name: 'createUser' })
  async createUser(@Args('input') input: UserCreateInput): Promise<UserPublic> {
    return await this.userService.create(UserMapper.toEntity(input))
  }
  @Mutation(returns => UserPublic, { name: 'updateUser' })
  async updateUser(@Args('input') input: UserUpdateInput): Promise<UserPublic> {
    return await this.userService.update(UserMapper.toEntityUpdate(input))
  }
  @Mutation(returns => Boolean, { name: 'removeUser' })
  async removeUser(@Args('id') id: string): Promise<boolean> {
    return await this.userService.remove(id)
  }
}
