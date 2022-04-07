import { ArgsType, Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateInput {
  @Field()
  username: string

  @Field()
  password: string

  @Field()
  email: string
}
