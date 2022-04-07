import { Field, InputType } from '@nestjs/graphql'
import { PostCategory } from '../post.entity'

@InputType()
export class PostCreateInput {
  @Field()
  user: string
  @Field()
  title: string
  @Field(type => PostCategory)
  category: PostCategory
  @Field()
  description: string
}
