import { Field, ObjectType } from '@nestjs/graphql'
import { CategoryPublic } from 'src/category/dto/category'
import { BrandPublic } from 'src/brand/dto/brand'
import { VariationPublic } from './variation'
import { Color } from './color'

@ObjectType('ProductPublic')
export class ProductPublic {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  category: CategoryPublic
  @Field({ nullable: true })
  brand: BrandPublic

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  price: number

  @Field({ nullable: true })
  slug: string

  @Field({ nullable: true })
  gender: string

  @Field({ nullable: true })
  material: string

  @Field({ nullable: true })
  color: Color

  @Field(type => [VariationPublic!], { nullable: true })
  variations: VariationPublic[]

  @Field(type => [String!], { nullable: true })
  images: string[]
}
