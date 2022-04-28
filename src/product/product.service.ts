import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { S3 } from 'src/utils/s3'
import { Repository } from 'typeorm'
import { buildPaginator } from 'typeorm-cursor-pagination'
import { Product } from './product.entity'
import * as sharp from 'sharp'
import { Category } from 'src/category/category.entity'
import { Brand } from '../brand/brand.entity'
import { PagingResult } from './dto/paging-result'
import { ProductFilter } from './dto/product-filter'
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    private s3: S3,
  ) {}
  async getAll(
    input: ProductFilter,
    afterCursor: string,
    beforeCursor: string,
  ): Promise<PagingResult> {
    const queryBuilder = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand')

    if (input) {
      if (input.brandSlug) {
        const brand = await this.brandRepository.findOne({
          where: [{ slug: input.brandSlug }],
        })
        queryBuilder.andWhere('product.brand = :brand', {
          brand: brand.id,
        })
      }
      if (input.categorySlug) {
        const category = await this.categoryRepository.findOne({
          where: [{ slug: input.categorySlug }],
        })
        queryBuilder.andWhere('product.category = :category', {
          category: category.id,
        })
      }
      if (input.gender) {
        queryBuilder.andWhere('product.gender = :gender', {
          gender: input.gender,
        })
      }
    }
    const paginator = buildPaginator({
      entity: Product,
      paginationKeys: ['id'],
      query: {
        limit: 6,
        order: 'ASC',
        afterCursor: afterCursor ? afterCursor : null,
        beforeCursor: beforeCursor ? beforeCursor : null,
      },
    })
    const { data, cursor } = await paginator.paginate(queryBuilder)
    return { data, cursor }
  }

  async getByCategory(categorySlug: string): Promise<Product[]> {
    const category = await this.categoryRepository.findOne({
      where: [{ slug: categorySlug }],
    })
    return this.productRepository.find({ where: [{ category: category.id }] })
  }
  async getByCategoryAndGender(
    categorySlug: string,
    gender: string,
    limit: number,
  ): Promise<Product[]> {
    const category = await this.categoryRepository.findOne({
      where: [{ slug: categorySlug }],
    })
    if (limit) {
      return this.productRepository.find({
        where: [{ category: category.id, gender: gender }],
        take: limit,
      })
    }
    return this.productRepository.find({
      where: [{ category: category.id, gender: gender }],
    })
  }
  async getByCategoryLimited(categorySlug: string): Promise<Product[]> {
    const category = await this.categoryRepository.findOne({
      where: [{ slug: categorySlug }],
    })
    return this.productRepository.find({
      where: [{ category: category.id }],
      take: 5,
    })
  }
  async getByBrand(brandSlug: string): Promise<Product[]> {
    const brand = await this.brandRepository.findOne({
      where: [{ slug: brandSlug }],
    })
    return this.productRepository.find({ where: [{ brand: brand.id }] })
  }
  async getByBrandAndGender(
    brandSlug: string,
    gender: string,
    limit: number,
  ): Promise<Product[]> {
    const brand = await this.brandRepository.findOne({
      where: [{ slug: brandSlug }],
    })
    if (limit) {
      return this.productRepository.find({
        where: [{ brand: brand.id, gender: gender }],
        take: limit,
      })
    }
    return this.productRepository.find({
      where: [{ brand: brand.id, gender: gender }],
    })
  }
  async getByBrandLimited(brandSlug: string): Promise<Product[]> {
    const brand = await this.brandRepository.findOne({
      where: [{ slug: brandSlug }],
    })
    return this.productRepository.find({
      where: [{ brand: brand.id }],
      take: 3,
    })
  }
  async getByName(name: string): Promise<Product[]> {
    return this.productRepository.find({ where: [{ name }] })
  }
  async getById(id: string): Promise<Product> {
    return this.productRepository.findOne(id)
  }
  async getBySlug(slug: string): Promise<Product> {
    return this.productRepository.findOne({ where: [{ slug }] })
  }
  async create(input: Product): Promise<Product> {
    return this.productRepository.save(input)
  }
  async update(input: Product): Promise<Product> {
    await this.productRepository.update(input.id, {
      category: input.category,
      brand: input.brand,
      name: input.name,
      description: input.description,
      price: input.price,
      gender: input.gender,
      material: input.material,
      slug: input.slug,
      color: input.color,
      variations: input.variations,
    })
    return input
  }
  async delete(id: string): Promise<boolean> {
    try {
      await this.productRepository.delete(id)
      return true
    } catch (err) {
      return false
    }
  }
  async uploadProductImage(
    id: string,
    createReadStream: () => any,
    filename: string,
    mimetype: string,
  ): Promise<boolean> {
    const product = await this.productRepository.findOne(id)
    if (!product) {
      return false
    }
    if (!product.images) {
      product.images = []
    }
    const stream = createReadStream().pipe(sharp().resize({ width: 500 }))
    const url = await this.s3.upload(
      stream,
      mimetype,
      'devshop-assets-2022',
      id + '-' + filename,
    )
    product.images.push(url)
    await this.productRepository.update(id, {
      images: product.images,
    })
    return true
  }
  async removeProductImage(id: string, url: string): Promise<boolean> {
    const product = await this.productRepository.findOne(id)
    if (!product) {
      return false
    }
    if (!product.images) {
      product.images = []
    }
    product.images = product.images.filter(imgUrl => imgUrl !== url)
    const filename = url.split('.com/')[1]
    await this.s3.deleteObject('devshop-assets-2022', filename)
    await this.productRepository.update(product.id, {
      images: product.images,
    })
    return true
  }
}
