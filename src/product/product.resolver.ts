import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthGuard } from 'src/utils/jwt-auth.guard'
import { ProductPublic } from './dto/product'
import { ProductCreateInput } from './dto/product-create.input'
import { ProductUpdateInput } from './dto/product-update.input'
import { ProductMapper } from './product.mapper'
import { ProductService } from './product.service'
import { GraphQLUpload, FileUpload } from 'graphql-upload'

@Resolver(of => ProductPublic)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(returns => [ProductPublic], { name: 'getAllProducts' })
  async getAllProducts(): Promise<ProductPublic[]> {
    return await this.productService.getAll()
  }
  @Query(returns => [ProductPublic], { name: 'getProductsByCategory' })
  async getProductsByCategory(
    @Args('categorySlug') categorySlug: string,
  ): Promise<ProductPublic[]> {
    return await this.productService.getByCategory(categorySlug)
  }
  @Query(returns => [ProductPublic], { name: 'getProductsByCategoryLimited' })
  async getProductsByCategoryLimited(
    @Args('categorySlug') categorySlug: string,
  ): Promise<ProductPublic[]> {
    return await this.productService.getByCategoryLimited(categorySlug)
  }
  @Query(returns => [ProductPublic], { name: 'getProductsByBrand' })
  async getProductsByBrand(
    @Args('brandSlug') brandSlug: string,
  ): Promise<ProductPublic[]> {
    return await this.productService.getByBrand(brandSlug)
  }
  @Query(returns => [ProductPublic], { name: 'getProductsByBrandAndGender' })
  async getProductsByBrandAndGender(
    @Args('brandSlug') brandSlug: string,
    @Args('gender') gender: string,
    @Args('limit', { nullable: true, type: () => Int }) limit: number,
  ): Promise<ProductPublic[]> {
    return await this.productService.getByBrandAndGender(
      brandSlug,
      gender,
      limit,
    )
  }
  @Query(returns => [ProductPublic], { name: 'getProductsByBrandLimited' })
  async getProductsByBrandLimited(
    @Args('brandSlug') brandSlug: string,
  ): Promise<ProductPublic[]> {
    return await this.productService.getByBrandLimited(brandSlug)
  }
  @Query(returns => [ProductPublic], { name: 'getProductsByName' })
  async getProductsByName(
    @Args('name') name: string,
  ): Promise<ProductPublic[]> {
    return await this.productService.getByName(name)
  }
  @Query(returns => ProductPublic, { name: 'getProductById' })
  async getProductById(@Args('id') id: string): Promise<ProductPublic> {
    return await this.productService.getById(id)
  }
  @Query(returns => ProductPublic, { name: 'getProductBySlug' })
  async getProductBySlug(@Args('slug') slug: string): Promise<ProductPublic> {
    return this.productService.getBySlug(slug)
  }
  @Mutation(returns => ProductPublic, { name: 'panelCreateProduct' })
  async createProduct(
    @Args('input') input: ProductCreateInput,
  ): Promise<ProductPublic> {
    return await this.productService.create(ProductMapper.toEntity(input))
  }
  @UseGuards(AuthGuard)
  @Mutation(returns => ProductPublic, { name: 'panelUpdateProduct' })
  async updateProduct(
    @Args('input') input: ProductUpdateInput,
  ): Promise<ProductPublic> {
    return await this.productService.update(
      ProductMapper.fromUpdateToEntity(input),
    )
  }
  @UseGuards(AuthGuard)
  @Mutation(returns => Boolean, { name: 'panelDeleteProduct' })
  async deleteProduct(@Args('id') input: string): Promise<boolean> {
    return this.productService.delete(input)
  }
  @UseGuards(AuthGuard)
  @Mutation(returns => Boolean, { name: 'panelUploadProductImage' })
  async uploadProductImage(
    @Args('id') id: string,
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ): Promise<boolean> {
    const { createReadStream, filename, mimetype } = await file
    return await this.productService.uploadProductImage(
      id,
      createReadStream,
      filename,
      mimetype,
    )
  }
  @UseGuards(AuthGuard)
  @Mutation(returns => Boolean, { name: 'panelDeleteProductImage' })
  async deleteProductImage(
    @Args('id') id: string,
    @Args('url') url: string,
  ): Promise<boolean> {
    return this.productService.removeProductImage(id, url)
  }
}
