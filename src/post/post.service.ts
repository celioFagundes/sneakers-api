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
}
