import { Field, ObjectType } from '@nestjs/graphql'
import { ProductPublic } from './product'

@ObjectType()
export class Cursor {
  @Field({ nullable: true })
  beforeCursor: string
  @Field({ nullable: true })
  afterCursor: string
}
@ObjectType()
export class PagingResult {
  @Field(type => [ProductPublic!])
  data: ProductPublic[]
  @Field(type => Cursor, { nullable: true })
  cursor: Cursor
}
