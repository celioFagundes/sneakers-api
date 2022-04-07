import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Solution } from './solution.entity'
import { SolutionResolver } from './solution.resolver'
import { SolutionService } from './solution.service'

@Module({
  imports: [TypeOrmModule.forFeature([Solution])],
  providers: [SolutionResolver, SolutionService],
})
export class SolutionModule {}
