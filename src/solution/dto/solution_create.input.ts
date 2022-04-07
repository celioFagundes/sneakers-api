import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SolutionCreateInput {
  @Field()
  user: string

  @Field()
  post: string

  @Field()
  description: string
}
