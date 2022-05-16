import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { S3 } from '../utils/s3'
import TestUtil from '../core/test/TestUtil'
import { Brand } from './brand.entity'
import { BrandService } from './brand.service'

describe('brand service', () => {
  let service: BrandService
  const brandMockRepository = {
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
        BrandService,
        {
          provide: getRepositoryToken(Brand),
          useValue: brandMockRepository,
        },
        {
          provide: S3,
          useFactory: () => mS3Instance,
        },
      ],
    }).compile()
    service = module.get<BrandService>(BrandService)
  })

  beforeEach(() => {
    brandMockRepository.find.mockReset()
    brandMockRepository.findOne.mockReset()
    brandMockRepository.save.mockReset()
    brandMockRepository.delete.mockReset()
    brandMockRepository.update.mockReset()
    mS3Instance.deleteObject.mockReset()
    mS3Instance.promise.mockReset()
    mS3Instance.upload.mockReset()
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  describe('getAll', () => {
    it(' should list all brands', async () => {
      const brand = TestUtil.giveMeAValidBrand()
      brandMockRepository.find.mockReturnValue([brand, brand])
      const brands = await service.getAll()
      expect(brands).toHaveLength(2)
      expect(brandMockRepository.find).toBeCalledTimes(1)
    })
  })
  describe('getById', () => {
    it('should find brand that matches id', async () => {
      const brand = TestUtil.giveMeAValidBrand()
      brandMockRepository.findOne.mockReturnValue(brand)
      const brandFound = await service.getById('1')
      expect(brandFound).toMatchObject({
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
      })
      expect(brandMockRepository.findOne).toHaveBeenCalledTimes(1)
    })
  })

  describe('getBySlug', () => {
    it('should find a brand that matches the slug', async () => {
      const brand = TestUtil.giveMeAValidBrand()
      brandMockRepository.findOne.mockReturnValue(brand)
      const brandFound = await service.getBySlug('Valid slug')
      expect(brandFound).toMatchObject({
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
      })
      expect(brandMockRepository.findOne).toHaveBeenCalledTimes(1)
    })
  })
  describe('create', () => {
    it('should create a brand', async () => {
      const brand = TestUtil.giveMeAValidBrand()
      brandMockRepository.save.mockReturnValue(brand)
      const savedBrand = await service.create(brand)
      expect(savedBrand).toMatchObject(brand)
      expect(brandMockRepository.save).toBeCalledTimes(1)
    })
  })
  describe('update', () => {
    it('should update a brand', async () => {
      const brand = TestUtil.giveMeAValidBrand()
      brandMockRepository.update.mockReturnValue(brand)
      const updatedBrand = await service.update(brand)
      expect(updatedBrand).toMatchObject(brand)
      expect(brandMockRepository.update).toBeCalledTimes(1)
    })
  })
  describe('delete a brand', () => {
    it('should delete a brand with logo', async () => {
      const brand = TestUtil.giveMeAValidBrand()
      brandMockRepository.findOne.mockReturnValue(brand)
      mS3Instance.deleteObject.mockReturnValue(true)
      const deleted = await service.delete('1')
      expect(deleted).toBe(true)
      expect(brandMockRepository.findOne).toBeCalledTimes(1)
      expect(brandMockRepository.delete).toBeCalledTimes(1)
      expect(mS3Instance.deleteObject).toBeCalledTimes(1)
    })
    it('should delete a brand without logo', async () => {
      const brand = TestUtil.giveMeAValidBrand()
      brandMockRepository.findOne.mockReturnValue({ ...brand, logo: null })
      const deleted = await service.delete('1')
      expect(deleted).toBe(true)
      expect(brandMockRepository.findOne).toBeCalledTimes(1)
      expect(brandMockRepository.delete).toBeCalledTimes(1)
      expect(mS3Instance.deleteObject).toBeCalledTimes(0)
    })
    it('should not delete a brand ', async () => {
      brandMockRepository.findOne.mockReturnValue(null)
      const deleted = await service.delete('1')
      expect(deleted).toBe(false)
      expect(brandMockRepository.findOne).toBeCalledTimes(1)
      expect(brandMockRepository.delete).toBeCalledTimes(0)
      expect(mS3Instance.deleteObject).toBeCalledTimes(0)
    })
  })
  describe('remove brand logo', () => {
    it('should remove a brand logo', async () => {
      const brand = TestUtil.giveMeAValidBrand()
      brandMockRepository.findOne.mockReturnValue(brand)
      brandMockRepository.update.mockReturnValue({ ...brand, logo: null })
      mS3Instance.deleteObject.mockReturnValue(true)

      const removedBrandLogo = await service.removeBrandLogo('1')
      expect(removedBrandLogo).toBe(true)
      expect(mS3Instance.deleteObject).toBeCalledTimes(1)
      expect(brandMockRepository.update).toBeCalledTimes(1)
      expect(brandMockRepository.findOne).toBeCalledTimes(1)
    })
  })
  /*describe('upload a brand logo', () => {
    it('should upload when brand doenst have a logo', async () => {
      const brand = TestUtil.giveMeAValidBrand()
      brandMockRepository.findOne.mockReturnValue({ ...brand, logo: null })
      mS3Instance.upload.mockReturnValue('www.amazon.com/s3/bucket/filename')
      const mockCreateReadStream = jest.fn().mockReturnThis()
      const mockStreamPipe = { pipe: jest.fn().mockReturnThis() }
      mockCreateReadStream.mockReturnValueOnce(mockStreamPipe)
      const stream = mockCreateReadStream()

      const url = await mS3Instance.upload(
        stream,
        'file',
        'bucket-url',
        'filename',
      )
      brandMockRepository.update.mockReturnValue({
        ...brand,
        logo: url,
      })
      const updatedBrand = await service.uploadLogo(
        '1',
        mockCreateReadStream,
        'filename',
        'file',
      )
      expect(updatedBrand).toBe(true)
      expect(mS3Instance.upload).toBeCalledTimes(1)
      expect(brandMockRepository.findOne).toBeCalledTimes(1)
      expect(brandMockRepository.update).toBeCalledTimes(1)
    })
  })*/
})
