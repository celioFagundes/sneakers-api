import { User } from 'src/user/user.entity'
import { PostCreateInput } from './dto/post_create.input'
import { PostUpdateInput } from './dto/post_update.input'
import { Post } from './post.entity'

export class PostMapper {
  public static toEntity(input: PostCreateInput): Post {
    const entity = new Post()
    const user = new User()
    user.id = input.user
    entity.user = user
    entity.title = input.title
    entity.category = input.category
    entity.description = input.description
    return entity
  }
  public static toEntityUpdate(input: PostUpdateInput): Post {
    const entity = new Post()
    entity.id = input.id
    entity.title = input.title
    entity.description = input.description
    return entity
  }
}
