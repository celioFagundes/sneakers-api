import { Solution } from 'src/solution/solution.entity'
import { User } from 'src/user/user.entity'
import { ReplyCreateInput } from './dto/reply_create.input'
import { ReplyUpdateInput } from './dto/reply_update.input'
import { Reply } from './Reply.entity'

export class ReplyMapper {
  public static toEntity(input: ReplyCreateInput): Reply {
    const entity = new Reply()
    const user = new User()
    user.id = input.user
    entity.user = user
    const solution = new Solution()
    solution.id = input.solution
    entity.solution = solution
    entity.description = input.description
    return entity
  }
  public static toEntityUpdate(input: ReplyUpdateInput): Reply {
    const entity = new Reply()
    entity.id = input.id
    entity.description = input.description
    return entity
  }
}
