import { Field, ObjectType } from '@nestjs/graphql'
import { SolutionPublic } from 'src/solution/dto/solution_public'
import { UserPublic } from 'src/user/dto/user_public'

@ObjectType()
export class ReplyPublic {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  user: UserPublic

  @Field({ nullable: true })
  solution: SolutionPublic

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  createdAt: Date

  @Field({ nullable: true })
  updatedAt: Date
}
