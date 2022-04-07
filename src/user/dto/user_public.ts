import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserPublic {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  username: string

  @Field({ nullable: true })
  email: string

  @Field({ nullable: true })
  createdAt: Date
}
