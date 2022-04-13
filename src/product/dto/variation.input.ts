import { Field, Float, InputType, Int } from '@nestjs/graphql'

@InputType()
export class VariationInput {
  @Field()
  size: string
  @Field()
  sku: string
  @Field(type => Float)
  weight: number
  @Field(type => Int)
  stock: number
}
