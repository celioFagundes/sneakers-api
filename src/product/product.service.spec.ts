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
      const productBySlug = await service.getBySlug('Valid Slug')
      expect(productBySlug).toMatchObject(product)
      expect(productMockRepository.findOne).toBeCalledTimes(1)
    }))
  describe('create', () =>
    it('should create a product', async () => {
      const product = TestUtil.giveMeAValidProduct()
      productMockRepository.save.mockReturnValue(product)
      const productCreated = await service.create(product)
      expect(productCreated).toMatchObject(product)
      expect(productMockRepository.save).toBeCalledTimes(1)
    }))
  describe('update', () =>
    it('should update a product', async () => {
      const product = TestUtil.giveMeAValidProduct()
      productMockRepository.update.mockReturnValue(product)
      const productUpdated = await service.update(product)
      expect(productUpdated).toMatchObject(product)
      expect(productMockRepository.update).toBeCalledTimes(1)
    }))
  describe('delete', () => {
    it('should success to delete a product', async () => {
      productMockRepository.delete.mockResolvedValue(true)
      const productDeleted = await service.delete('1')
      expect(productDeleted).toBe(true)
      expect(productMockRepository.delete).toBeCalledTimes(1)
    })
    it('should fail to delete a product', async () => {
      productMockRepository.delete.mockRejectedValue(false)
      const productDeleted = await service.delete('1')
      expect(productDeleted).toBe(false)
      expect(productMockRepository.delete).toBeCalledTimes(1)
    })
  })
})
