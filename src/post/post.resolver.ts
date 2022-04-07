import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PostCreateInput } from './dto/post_create.input'
import { PostPublic } from './dto/post_public'
import { PostUpdateInput } from './dto/post_update.input'
import { PostMapper } from './post.mapper'
import { PostService } from './post.service'

@Resolver(of => PostPublic)
export class PostResolver {
  constructor(private readonly postService: PostService) {}
  @Query(returns => [PostPublic], { name: 'getAllPosts' })
  async getAllPosts(): Promise<PostPublic[]> {
    return await this.postService.getAll()
  }
  @Mutation(returns => PostPublic, { name: 'createPost' })
  async createPost(@Args('input') input: PostCreateInput): Promise<PostPublic> {
    return await this.postService.create(PostMapper.toEntity(input))
  }
  @Mutation(returns => PostPublic, { name: 'updatePost' })
  async updatePost(@Args('input') input: PostUpdateInput): Promise<PostPublic> {
    return await this.postService.update(PostMapper.toEntityUpdate(input))
  }
  @Mutation(returns => Boolean, { name: 'removePost' })
  async removePost(@Args('id') id: string): Promise<boolean> {
    return await this.postService.remove(id)
  }
}
