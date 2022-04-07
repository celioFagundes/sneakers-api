import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SolutionUpdateInput {
  @Field()
  id: string
  @Field()
  description: string
}
