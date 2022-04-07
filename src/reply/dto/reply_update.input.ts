import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ReplyUpdateInput {
  @Field()
  id: string
  @Field()
  description: string
}
