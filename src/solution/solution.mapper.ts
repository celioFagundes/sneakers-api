import { Post } from 'src/post/post.entity'
import { User } from 'src/user/user.entity'
import { SolutionCreateInput } from './dto/solution_create.input'
import { SolutionUpdateInput } from './dto/solution_update.input'
import { Solution } from './solution.entity'

export class SolutionMapper {
  public static toEntity(input: SolutionCreateInput): Solution {
    const entity = new Solution()
    const user = new User()
    user.id = input.user
    entity.user = user
    const post = new Post()
    post.id = input.post
    entity.post = post
    entity.description = input.description
    return entity
  }
  public static toEntityUpdate(input: SolutionUpdateInput): Solution {
    const entity = new Solution()
    entity.id = input.id
    entity.description = input.description
    return entity
  }
}
