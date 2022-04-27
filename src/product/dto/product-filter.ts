import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ProductFilter {
  @Field({ nullable: true })
  brandSlug: string
  @Field({ nullable: true })
  categorySlug: string
  @Field({ nullable: true })
  gender: string
}
