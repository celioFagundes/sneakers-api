import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ReplyCreateInput } from './dto/reply_create.input'
import { ReplyPublic } from './dto/reply_public'
import { ReplyUpdateInput } from './dto/reply_update.input'
import { ReplyMapper } from './reply.mapper'
import { ReplyService } from './reply.service'

@Resolver(of => ReplyPublic)
export class ReplyResolver {
  constructor(private readonly replyService: ReplyService) {}

  @Query(returns => [ReplyPublic], { name: 'getAllReplies' })
  async getAllReplies(): Promise<ReplyPublic[]> {
    return await this.replyService.getAll()
  }
  @Mutation(returns => ReplyPublic, { name: 'createReply' })
  async createReply(
    @Args('input') input: ReplyCreateInput,
  ): Promise<ReplyPublic> {
    return await this.replyService.create(ReplyMapper.toEntity(input))
  }
  @Mutation(returns => ReplyPublic, { name: 'updateReply' })
  async updateReply(
    @Args('input') input: ReplyUpdateInput,
  ): Promise<ReplyPublic> {
    return await this.replyService.update(ReplyMapper.toEntityUpdate(input))
  }
  @Mutation(returns => Boolean, { name: 'removeReply' })
  async removeReply(@Args('id') id: string): Promise<boolean> {
    return await this.replyService.remove(id)
  }
}
