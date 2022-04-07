import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async getAll(): Promise<User[]> {
    return this.userRepository.find()
  }
  async create(input: User): Promise<User> {
    return this.userRepository.save(input)
  }
  async update(input: User): Promise<User> {
    await this.userRepository.update(input.id, {
      username: input.username,
    })
    return input
  }
  async remove(id: string): Promise<boolean> {
    try {
      this.userRepository.delete({ id })
      return true
    } catch (err) {
      return false
    }
  }
}
