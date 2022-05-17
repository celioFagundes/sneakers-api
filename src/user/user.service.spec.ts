import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UserService } from './user.service'
import { AuthToken } from './auth-token.entity'
import TestUtil from '../core/test/TestUtil'

describe('UserService', () => {
  let service: UserService

  const userMockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  }
  const authMockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  }
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: userMockRepository,
        },
        {
          provide: getRepositoryToken(AuthToken),
          useValue: authMockRepository,
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
  })
  beforeEach(() => {
    userMockRepository.find.mockReset()
    userMockRepository.findOne.mockReset()
    userMockRepository.save.mockReset()
    userMockRepository.delete.mockReset()
    userMockRepository.update.mockReset()
    authMockRepository.find.mockReset()
    authMockRepository.findOne.mockReset()
    authMockRepository.save.mockReset()
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getAll', () => {
    it('should list all users', async () => {
      const user = TestUtil.giveMeAValidUser()
      userMockRepository.find.mockReturnValue([user, user])
      const users = await service.getAll()
      expect(users).toHaveLength(2)
      expect(userMockRepository.find).toHaveBeenCalledTimes(1)
    })
  })
  describe('getById', () => {
    it('should find an existing user', async () => {
      const user = TestUtil.giveMeAValidUser()
      userMockRepository.findOne.mockReturnValue(user)
      const userFound = await service.getById('1')
      expect(userFound).toMatchObject({
        id: user.id,
        name: user.name,
        email: user.email,
      })
      expect(userMockRepository.findOne).toHaveBeenCalledTimes(1)
    })
  })

  describe('getByEmail', () => {
    it('should find a user that matches the email', async () => {
      const user = TestUtil.giveMeAValidUser()
      userMockRepository.findOne.mockReturnValue(user)
      const userFound = await service.getByEmail('valid@email.com')
      expect(userFound).toMatchObject({
        id: user.id,
        name: user.name,
        email: user.email,
      })
      expect(userMockRepository.findOne).toHaveBeenCalledTimes(1)
    })
  })

  describe('getAllUserSessions', () => {
    it('should find all user sessions', async () => {
      const authToken = TestUtil.giveMeAValidAuthToken()
      authMockRepository.find.mockReturnValue([authToken, authToken])
      const sessions = await service.getAllUserSessions('1')
      expect(sessions).toHaveLength(2)
      expect(authMockRepository.find).toHaveBeenCalledTimes(1)
    })
  })

  describe('create', () => {
    it('should create a user', async () => {
      const user = TestUtil.giveMeAValidUser()
      userMockRepository.save.mockReturnValue(user)
      const savedUser = await service.create(user)
      expect(savedUser).toMatchObject(user)
      expect(userMockRepository.save).toBeCalledTimes(1)
    })
  })
  describe('update', () => {
    it('should update a user', async () => {
      const user = TestUtil.giveMeAValidUser()
      userMockRepository.update.mockReturnValue(user)
      const updatedUser = await service.update(user)
      expect(updatedUser).toMatchObject(user)
      expect(userMockRepository.update).toBeCalledTimes(1)
    })
  })
  describe('update password', () => {
    it('should update a user password', async () => {
      const user = TestUtil.giveMeAValidUser()
      userMockRepository.update.mockReturnValue(user)
      const updatedUser = await service.changePassword('1', 'new password')
      expect(updatedUser).toBe(true)
      expect(userMockRepository.update).toBeCalledTimes(1)
    })
  })
  describe('delete', () => {
    it('should delete a user', async () => {
      userMockRepository.delete.mockReturnValue('1')
      const deleted = await service.delete('1')
      expect(deleted).toBe(true)
      expect(userMockRepository.delete).toBeCalledTimes(1)
    })
    it('should not delete a user', async () => {
      userMockRepository.delete.mockReturnValue(null)
      expect(await service.delete('9')).toBe(false)
      expect(userMockRepository.delete).toBeCalledTimes(1)
    })
  })
  describe('auth', () => {
    it('should success authentication', async () => {
      const user = TestUtil.giveMeAValidUser()
      const token = TestUtil.giveMeAValidAuthToken()
      token.user = user
      token.userAgent = 'new user agent'
      const spy = jest.spyOn(user, 'checkPassword').mockResolvedValue(true)
      userMockRepository.findOne.mockReturnValue(user)
      authMockRepository.save.mockReturnValue(token)
      const auth = await service.auth('email', 'password', 'userAgent')
      expect(auth).toStrictEqual([user, token])
      expect(authMockRepository.save).toBeCalledTimes(1)
      expect(userMockRepository.findOne).toBeCalledTimes(1)
      expect(spy).toBeCalledTimes(1)
    })
    it('should fail authentication by wrong password', async () => {
      const user = TestUtil.giveMeAValidUser()
      const spy = jest.spyOn(user, 'checkPassword').mockResolvedValue(false)
      userMockRepository.findOne.mockReturnValue(user)
      const auth = await service.auth('email', 'password', 'userAgent')
      expect(auth).toStrictEqual([null, null])
      expect(authMockRepository.save).toBeCalledTimes(0)
      expect(userMockRepository.findOne).toBeCalledTimes(1)
      expect(spy).toBeCalledTimes(1)
    })
    it('should fail authentication by user not found', async () => {
      const user = TestUtil.giveMeAValidUser()
      const spy = jest.spyOn(user, 'checkPassword').mockResolvedValue(false)
      userMockRepository.findOne.mockReturnValue(null)
      const auth = await service.auth('email', 'password', 'userAgent')
      expect(auth).toStrictEqual([null, null])
      expect(authMockRepository.save).toBeCalledTimes(0)
      expect(userMockRepository.findOne).toBeCalledTimes(1)
      expect(spy).toBeCalledTimes(0)
    })
  })
  describe('getRefreshToken', () => {
    it('should return a refresh token', async () => {
      const refreshToken = TestUtil.giveMeAValidAuthToken()
      authMockRepository.findOne.mockReturnValue(refreshToken)
      authMockRepository.save.mockReturnValue(refreshToken)
      const getToken = await service.getRefreshToken('1')
      expect(getToken).toBe(refreshToken)
      expect(authMockRepository.findOne).toBeCalledTimes(1)
      expect(authMockRepository.save).toBeCalledTimes(1)
    })
  })
  describe('invalidateRefreshToken', () => {
    it('should invalidate a refresh token', async () => {
      const refreshToken = TestUtil.giveMeAValidAuthToken()
      refreshToken.active = false
      authMockRepository.findOne.mockReturnValue(refreshToken)
      authMockRepository.save.mockReturnValue(refreshToken)
      const getToken = await service.invalidateRefreshToken('1')
      expect(getToken).toBe(true)
      expect(refreshToken.active).toBe(false)
      expect(authMockRepository.findOne).toBeCalledTimes(1)
      expect(authMockRepository.save).toBeCalledTimes(1)
    })
  })
})
