import { PostCreateInput } from './dto/post_create.input'
import { Post } from './post.entity'

export class PostMapper {
  public static toEntity(input: PostCreateInput): Post {
    const entity = new Post()
    entity.username = input.username
    entity.description = input.description
    return entity
  }
}
