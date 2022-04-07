import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { SolutionCreateInput } from './dto/solution_create.input'
import { SolutionPublic } from './dto/solution_public'
import { SolutionUpdateInput } from './dto/solution_update.input'
import { SolutionMapper } from './solution.mapper'
import { SolutionService } from './solution.service'

@Resolver(of => SolutionPublic)
export class SolutionResolver {
  constructor(private readonly solutionService: SolutionService) {}
  @Query(returns => [SolutionPublic], { name: 'getAllSolutions' })
  async getAllSolutions(): Promise<SolutionPublic[]> {
    return await this.solutionService.getAll()
  }
  @Mutation(returns => SolutionPublic, { name: 'createSolution' })
  async createSolution(
    @Args('input') input: SolutionCreateInput,
  ): Promise<SolutionPublic> {
    return await this.solutionService.create(SolutionMapper.toEntity(input))
  }
  @Mutation(returns => SolutionPublic, { name: 'updateSolution' })
  async updateSolution(
    @Args('input') input: SolutionUpdateInput,
  ): Promise<SolutionPublic> {
    return await this.solutionService.update(
      SolutionMapper.toEntityUpdate(input),
    )
  }
  @Mutation(returns => Boolean, { name: 'removeSolution' })
  async removeSolution(@Args('id') id: string): Promise<boolean> {
    return await this.solutionService.remove(id)
  }
}
