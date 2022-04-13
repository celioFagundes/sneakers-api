import { Field, Float, Int, ObjectType } from '@nestjs/graphql'

@ObjectType('VariationPublic')
export class VariationPublic {
  @Field()
  size: string
  @Field()
  sku: string
  @Field(type => Float)
  weight: number
  @Field(type => Int)
  stock: number
}
