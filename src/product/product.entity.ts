import { registerEnumType } from '@nestjs/graphql'
import { Brand } from 'src/brand/brand.entity'
import { Category } from 'src/category/category.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

interface Color {
  colorName: string
  colorCode: string
}
interface ProductVariation {
  size: string
  sku: string
  weight: number
  stock: number
}
export enum ProductGender {
  MEN = 'Men',
  WOMEN = 'Women',
  UNISEX = 'Unisex',
}
registerEnumType(ProductGender, {
  name: 'ProductGender',
})
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Category, category => category.id, {
    eager: true,
  })
  category: Category
  @ManyToOne(type => Brand, brand => brand.id, {
    eager: true,
  })
  brand: Brand

  @Column({ length: 250 })
  name: string

  @Column({ length: 500 })
  description: string

  @Column({ type: 'decimal' })
  price: number

  @Column({ length: 250 })
  slug: string

  @Column({
    type: 'enum',
    enum: ProductGender,
    default: ProductGender.MEN,
    nullable: false,
  })
  gender: ProductGender

  @Column()
  material: string

  @Column({ type: 'jsonb' })
  color: Color

  @Column({ type: 'jsonb' })
  variations: ProductVariation[]

  @Column({ type: 'jsonb', nullable: true })
  images: string[]
}
