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
    jest.resetAllMocks()

    mS3Instance.deleteObject.mockReset()
    mS3Instance.promise.mockReset()
    mS3Instance.upload.mockReset()
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  describe('getAllNoFilter', () => {
    it('should return all products', async () => {
      const product = TestUtil.giveMeAValidProduct()
      productMockRepository.find.mockReturnValue([product, product, product])
      const products = await service.getAllNoFilter()
      expect(products).toHaveLength(3)
      expect(productMockRepository.find).toBeCalledTimes(1)
    })
  })
  describe('getByCategory', () =>
    it('should return a product that matches the category', async () => {
      const category = TestUtil.giveMeAValidCategory()
      const product = TestUtil.giveMeAValidProduct()
      categoryMockRepository.findOne.mockReturnValue(category)
      productMockRepository.find.mockReturnValue([product, product, product])
      const productsByCategory = await service.getByCategory('Valid category')
      expect(productsByCategory).toHaveLength(3)
      expect(productMockRepository.find).toBeCalledTimes(1)
      expect(categoryMockRepository.findOne).toBeCalledTimes(1)
    }))
  describe('getByCategoryAndGender', () => {
    it('should return limited products that matches the category and gender', async () => {
      const category = TestUtil.giveMeAValidCategory()
      const product = TestUtil.giveMeAValidProduct()
      categoryMockRepository.findOne.mockReturnValue(category)
      productMockRepository.find.mockReturnValue([product, product, product])
      const productByCategorydAndGender = await service.getByCategoryAndGender(
        'Valid Category',
        'Valid Gender',
        3,
      )
      expect(productByCategorydAndGender).toHaveLength(3)
      expect(productMockRepository.find).toBeCalledTimes(1)
      expect(categoryMockRepository.findOne).toBeCalledTimes(1)
    })
    it('should return unlimited products that matches the category and gender', async () => {
      const category = TestUtil.giveMeAValidCategory()
      const product = TestUtil.giveMeAValidProduct()
      categoryMockRepository.findOne.mockReturnValue(category)
      productMockRepository.find.mockReturnValue([
        product,
        product,
        product,
        product,
        product,
        product,
      ])
      const productByCategoryAndGender = await service.getByCategoryAndGender(
        'Valid category',
        'Valid Gender',
        null,
      )
      expect(productByCategoryAndGender).toHaveLength(6)
      expect(productMockRepository.find).toBeCalledTimes(1)
      expect(categoryMockRepository.findOne).toBeCalledTimes(1)
    })
  })
  describe('getByCategoryLimited', () =>
    it('should return limited products that matches the category', async () => {
      const category = TestUtil.giveMeAValidCategory()
      const product = TestUtil.giveMeAValidProduct()
      categoryMockRepository.findOne.mockReturnValue(category)
      productMockRepository.find.mockReturnValue([product, product, product])
      const productByCategoryLimited = await service.getByCategoryLimited(
        'Valid category',
      )
      expect(productByCategoryLimited).toHaveLength(3)
      expect(productMockRepository.find).toBeCalledTimes(1)
      expect(categoryMockRepository.findOne).toBeCalledTimes(1)
    }))
  describe('getByBrand', () =>
    it('should return a product that matches the brand', async () => {
      const brand = TestUtil.giveMeAValidBrand()
      const product = TestUtil.giveMeAValidProduct()
      brandMockRepository.findOne.mockReturnValue(brand)
      productMockRepository.find.mockReturnValue([product, product, product])
      const productByName = await service.getByBrand('Valid brand')
      expect(productByName).toHaveLength(3)
      expect(productMockRepository.find).toBeCalledTimes(1)
    }))
  describe('getByBrandAndGender', () => {
    it('should return limited products that matches the brand and gender', async () => {
      const brand = TestUtil.giveMeAValidBrand()
      const product = TestUtil.giveMeAValidProduct()
      brandMockRepository.findOne.mockReturnValue(brand)
      productMockRepository.find.mockReturnValue([product, product, product])
      const productByBrandAndGender = await service.getByBrandAndGender(
        'Valid Brand',
        'Valid Gender',
        3,
      )
      expect(productByBrandAndGender).toHaveLength(3)
      expect(productMockRepository.find).toBeCalledTimes(1)
      expect(brandMockRepository.findOne).toBeCalledTimes(1)
    })
    it('should return unlimited products that matches the brand and gender', async () => {
      const brand = TestUtil.giveMeAValidBrand()
      const product = TestUtil.giveMeAValidProduct()
      brandMockRepository.findOne.mockReturnValue(brand)
      productMockRepository.find.mockReturnValue([
        product,
        product,
        product,
        product,
        product,
        product,
      ])
      const productByBrandAndGender = await service.getByBrandAndGender(
        'Valid Brand',
        'Valid Gender',
        null,
      )
      expect(productByBrandAndGender).toHaveLength(6)
      expect(productMockRepository.find).toBeCalledTimes(1)
      expect(brandMockRepository.findOne).toBeCalledTimes(1)
    })
  })
  describe('getByBrandLimited', () =>
    it('should return limited products that matches the brand', async () => {
      const brand = TestUtil.giveMeAValidBrand()
      const product = TestUtil.giveMeAValidProduct()
      brandMockRepository.findOne.mockReturnValue(brand)
      productMockRepository.find.mockReturnValue([product, product, product])
      const productByBrandLimited = await service.getByBrandLimited(
        'Valid Brand',
      )
      expect(productByBrandLimited).toHaveLength(3)
      expect(productMockRepository.find).toBeCalledTimes(1)
      expect(brandMockRepository.findOne).toBeCalledTimes(1)
    }))
  describe('getByName', () =>
    it('should return a product that matches the name', async () => {
      const product = TestUtil.giveMeAValidProduct()
      productMockRepository.find.mockReturnValue([product, product, product])
      const productByName = await service.getByName('Valid Name')
      expect(productByName).toHaveLength(3)
      expect(productMockRepository.find).toBeCalledTimes(1)
    }))
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
