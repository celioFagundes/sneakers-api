import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ReplyCreateInput {
  @Field({ nullable: true })
  user: string
  @Field({ nullable: true })
  solution: string
  @Field()
  description: string
}
