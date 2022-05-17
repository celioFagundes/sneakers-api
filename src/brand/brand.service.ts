import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { S3 } from '../utils/s3'
import { Repository } from 'typeorm'
import { Brand } from './brand.entity'
import * as sharp from 'sharp'
import { Readable } from 'stream'
import { ReadStream } from 'fs'
@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    private s3: S3,
  ) {}
  async getAll(): Promise<Brand[]> {
    return this.brandRepository.find()
  }
  async getById(id: string): Promise<Brand> {
    return this.brandRepository.findOne(id)
  }
  async getBySlug(slug: string): Promise<Brand> {
    return this.brandRepository.findOne({ where: [{ slug }] })
  }
  async create(input: Brand): Promise<Brand> {
    return this.brandRepository.save(input)
  }
  async update(input: Brand): Promise<Brand> {
    await this.brandRepository.update(input.id, {
      name: input.name,
      slug: input.slug,
    })
    return input
  }
  async delete(id: string): Promise<boolean> {
    const brand = await this.brandRepository.findOne(id)
    if (brand) {
      if (brand.logo) {
        const filename = brand.logo.split('.com/')[1]
        await this.s3.deleteObject('devshop-assets-2022', filename)
      }
      await this.brandRepository.delete(id)
      return true
    }
    return false
  }
  async uploadLogo(
    id: string,
    createReadStream: () => any,
    filename: string,
    mimetype: string,
  ): Promise<boolean> {
    const brand = await this.brandRepository.findOne(id)
    if (brand) {
      if (brand.logo) {
        const filename = brand.logo.split('.com/')[1]
        await this.s3.deleteObject('devshop-assets-2022', filename)
      }
      const stream = createReadStream().pipe(sharp().resize(300))
      const url = await this.s3.upload(
        stream,
        mimetype,
        'devshop-assets-2022',
        id + '-' + filename,
      )
      await this.brandRepository.update(id, {
        logo: url,
      })
      return true
    }
    return false
  }
  async removeBrandLogo(id: string): Promise<boolean> {
    const brand = await this.brandRepository.findOne(id)
    const filename = brand.logo.split('.com/')[1]
    await this.s3.deleteObject('devshop-assets-2022', filename)
    await this.brandRepository.update(brand.id, {
      logo: null,
    })
    return true
  }
}
