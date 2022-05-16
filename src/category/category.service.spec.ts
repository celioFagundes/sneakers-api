import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import TestUtil from '../core/test/TestUtil'
import { Category } from './category.entity'
import { CategoryService } from './category.service'

describe('Category service', () => {
  let service: CategoryService

  const categoryMockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  }
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: categoryMockRepository,
        },
      ],
    }).compile()
    service = module.get<CategoryService>(CategoryService)
  })

  beforeEach(() => {
    categoryMockRepository.find.mockReset()
    categoryMockRepository.findOne.mockReset()
    categoryMockRepository.save.mockReset()
    categoryMockRepository.delete.mockReset()
    categoryMockRepository.update.mockReset()
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  describe('getAll', () => {
    it(' should list all categories', async () => {
      const category = TestUtil.giveMeAValidCategory()
      categoryMockRepository.find.mockReturnValue([category, category])
      const categories = await service.getAll()
      expect(categories).toHaveLength(2)
      expect(categoryMockRepository.find).toBeCalledTimes(1)
    })
  })
  describe('getById', () => {
    it('should find category that matches id', async () => {
      const category = TestUtil.giveMeAValidCategory()
      categoryMockRepository.findOne.mockReturnValue(category)
      const categoryFound = await service.getById('1')
      expect(categoryFound).toMatchObject({
        id: category.id,
        name: category.name,
        slug: category.slug,
      })
      expect(categoryMockRepository.findOne).toHaveBeenCalledTimes(1)
    })
  })

  describe('getBySlug', () => {
    it('should find a category that matches the slug', async () => {
      const category = TestUtil.giveMeAValidCategory()
      categoryMockRepository.findOne.mockReturnValue(category)
      const categoryFound = await service.getBySlug('Valid slug')
      expect(categoryFound).toMatchObject({
        id: category.id,
        name: category.name,
        slug: category.slug,
      })
      expect(categoryMockRepository.findOne).toHaveBeenCalledTimes(1)
    })
  })
  describe('create', () => {
    it('should create a category', async () => {
      const category = TestUtil.giveMeAValidCategory()
      categoryMockRepository.save.mockReturnValue(category)
      const savedCategory = await service.create(category)
      expect(savedCategory).toMatchObject(category)
      expect(categoryMockRepository.save).toBeCalledTimes(1)
    })
  })
  describe('update', () => {
    it('should update a category', async () => {
      const category = TestUtil.giveMeAValidCategory()
      categoryMockRepository.update.mockReturnValue(category)
      const updatedCategory = await service.update(category)
      expect(updatedCategory).toMatchObject(category)
      expect(categoryMockRepository.update).toBeCalledTimes(1)
    })
  })
  describe('delete', () => {
    it('should delete a category', async () => {
      categoryMockRepository.delete.mockReturnValue('1')
      const deleted = await service.delete('1')
      expect(deleted).toBe(true)
      expect(categoryMockRepository.delete).toBeCalledTimes(1)
    })
    it('should not delete a user', async () => {
      categoryMockRepository.delete.mockReturnValue(null)
      expect(await service.delete('9')).toBe(false)
      expect(categoryMockRepository.delete).toBeCalledTimes(1)
    })
  })
})
