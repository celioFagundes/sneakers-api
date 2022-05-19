import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { S3 } from '../utils/s3'
import TestUtil from '../core/test/TestUtil'
import { Product } from './product.entity'
import { ProductService } from './product.service'
import { Brand } from '../brand/brand.entity'
import { Category } from '../category/category.entity'

describe('Product service', () => {
  let service: ProductService
  const productMockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  }
  const brandMockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  }
  const categoryMockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  }
  const mS3Instance = {
    upload: jest.fn().mockReturnThis(),
    promise: jest.fn(),
    deleteObject: jest.fn().mockReturnThis(),
  }
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: productMockRepository,
        },
        {
          provide: getRepositoryToken(Brand),
          useValue: brandMockRepository,
        },
        {
          provide: getRepositoryToken(Category),
          useValue: categoryMockRepository,
        },
        {
          provide: S3,
          useFactory: () => mS3Instance,
        },
      ],
    }).compile()
    service = module.get<ProductService>(ProductService)
  })

  beforeEach(() => {
    productMockRepository.find.mockReset()
    productMockRepository.findOne.mockReset()
    productMockRepository.save.mockReset()
    productMockRepository.delete.mockReset()
    productMockRepository.update.mockReset()
    mS3Instance.deleteObject.mockReset()
    mS3Instance.promise.mockReset()
    mS3Instance.upload.mockReset()
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  describe('getById', () =>
    it('should return a product that matches the id', async () => {
      const product = TestUtil.giveMeAValidProduct()
      productMockRepository.findOne.mockReturnValue(product)
      const productById = await service.getById('1')
      expect(productById).toMatchObject(product)
      expect(productMockRepository.findOne).toBeCalledTimes(1)
    }))
  describe('getBySlug', () =>
    it('should return a product that matches the slug', async () => {
      const product = TestUtil.giveMeAValidProduct()
      productMockRepository.findOne.mockReturnValue(product)
      const productById = await service.getBySlug('Valid Slug')
      expect(productById).toMatchObject(product)
      expect(productMockRepository.findOne).toBeCalledTimes(1)
    }))
})
