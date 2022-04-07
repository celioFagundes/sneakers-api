import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PostUpdateInput {
  @Field()
  id: string
  @Field()
  title: string
  @Field()
  description: string
}
