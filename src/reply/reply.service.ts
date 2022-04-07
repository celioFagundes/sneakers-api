import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Reply } from './reply.entity'

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private replyRepository: Repository<Reply>,
  ) {}
  async getAll(): Promise<Reply[]> {
    return this.replyRepository.find()
  }
  async create(input: Reply): Promise<Reply> {
    return this.replyRepository.save(input)
  }
  async update(input: Reply): Promise<Reply> {
    await this.replyRepository.update(input.id, {
      description: input.description,
    })
    return input
  }
  async remove(id: string): Promise<boolean> {
    try {
      this.replyRepository.delete({ id })
      return true
    } catch (err) {
      return false
    }
  }
}
