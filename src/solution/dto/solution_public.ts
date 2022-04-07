import { Field, ObjectType } from '@nestjs/graphql'
import { PostPublic } from 'src/post/dto/post_public'
import { UserPublic } from 'src/user/dto/user_public'

@ObjectType('SolutionPublic')
export class SolutionPublic {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  user: UserPublic

  @Field({ nullable: true })
  post: PostPublic

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  createdAt: Date

  @Field({ nullable: true })
  updatedAt: Date
}
