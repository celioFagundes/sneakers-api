import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('PostPublic')
export class PostPublic {
  @Field({ nullable: true })
  id: string
  @Field({ nullable: true })
  username: string
  @Field({ nullable: true })
  description: string
}
