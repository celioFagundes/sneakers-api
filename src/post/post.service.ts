import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Post } from './post.entity'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  async getAll(): Promise<Post[]> {
    return this.postRepository.find()
  }
  async create(input: Post): Promise<Post> {
    return this.postRepository.save(input)
  }
  async update(input: Post): Promise<Post> {
    await this.postRepository.update(input.id, {
      title: input.title,
      description: input.description,
    })
    return input
  }
  async remove(id: string): Promise<boolean> {
    try {
      this.postRepository.delete({ id })
      return true
    } catch (err) {
      return false
    }
  }
}
