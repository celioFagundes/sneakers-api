import { Field, Float, InputType } from '@nestjs/graphql'
import { IsUUID, Length, Matches, Validate } from 'class-validator'
import { ProductGender } from '../product.entity'
import { ProductSlugIsUnique } from '../validations/ProductSlugIsUnique'
import { ColorInput } from './color.input'
import { VariationInput } from './variation.input'

@InputType()
export class ProductUpdateInput {
  @Field()
  @IsUUID()
  id: string
  @Field()
  @IsUUID()
  category: string

  @Field()
  @IsUUID()
  brand: string

  @Field()
  @Length(3)
  name: string

  @Field()
  @Length(15)
  description: string

  @Field(type => Float)
  price: number

  @Field()
  @Length(3)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @Validate(ProductSlugIsUnique)
  slug: string

  @Field(type => ProductGender)
  gender: ProductGender

  @Field()
  @Length(3)
  material: string

  @Field(type => ColorInput)
  color: ColorInput

  @Field(type => [VariationInput]!)
  variations: VariationInput[]
}
