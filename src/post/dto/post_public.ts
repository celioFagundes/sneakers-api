import { Field, ObjectType } from '@nestjs/graphql'
import { UserPublic } from 'src/user/dto/user_public'

@ObjectType('PostPublic')
export class PostPublic {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  user: UserPublic

  @Field({ nullable: true })
  title: string

  @Field({ nullable: true })
  slug: string

  @Field({ nullable: true })
  category: string

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  solved: boolean

  @Field({ nullable: true })
  createdAt: Date

  @Field({ nullable: true })
  updatedAt: Date
}
