import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PostCreateInput {
  @Field()
  username: string
  @Field()
  description: string
}
