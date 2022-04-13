import { Product } from './product.entity'
import { ProductCreateInput } from './dto/product-create.input'
import { Category } from 'src/category/category.entity'
import { ProductUpdateInput } from './dto/product-update.input'
import { ProductPublic } from './dto/product'
import { Brand } from 'src/brand/brand.entity'
export class ProductMapper {
  public static toEntity(input: ProductCreateInput): Product {
    const entity = new Product()
    entity.name = input.name
    entity.slug = input.slug
    entity.description = input.description
    entity.price = input.price
    entity.gender = input.gender
    entity.material = input.material
    entity.color = input.color
    const category = new Category()
    category.id = input.category
    entity.category = category
    const brand = new Brand()
    brand.id = input.brand
    entity.brand = brand
    entity.variations = input.variations
    return entity
  }
  public static fromUpdateToEntity(input: ProductUpdateInput): Product {
    const entity = new Product()
    entity.id = input.id
    entity.name = input.name
    entity.slug = input.slug
    entity.description = input.description
    entity.price = input.price
    entity.gender = input.gender
    entity.material = input.material
    entity.color = input.color
    const category = new Category()
    category.id = input.category
    const brand = new Brand()
    brand.id = input.brand
    entity.brand = brand
    entity.category = category
    entity.variations = input.variations
    return entity
  }
  public static fromEntityToPublic(entity: Product): ProductPublic {
    const product = new ProductPublic()
    product.id = entity.id
    product.name = entity.name
    product.slug = entity.slug
    product.description = entity.description
    product.category = entity.category
    product.brand = entity.brand
    product.images = entity.images
    product.price = entity.price
    product.color = entity.color
    product.variations = entity.variations
    return product
  }
}
