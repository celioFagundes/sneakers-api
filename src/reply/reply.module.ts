import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Reply } from './reply.entity'
import { ReplyResolver } from './reply.resolver'
import { ReplyService } from './reply.service'

@Module({
  imports: [TypeOrmModule.forFeature([Reply])],
  providers: [ReplyResolver, ReplyService],
})
export class ReplyModule {}
