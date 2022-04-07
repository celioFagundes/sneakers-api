import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Solution } from './solution.entity'

@Injectable()
export class SolutionService {
  constructor(
    @InjectRepository(Solution)
    private solutionRepository: Repository<Solution>,
  ) {}
  async getAll(): Promise<Solution[]> {
    return this.solutionRepository.find()
  }
  async create(input: Solution): Promise<Solution> {
    return this.solutionRepository.save(input)
  }
  async update(input: Solution): Promise<Solution> {
    await this.solutionRepository.update(input.id, {
      description: input.description,
    })
    return input
  }
  async remove(id: string): Promise<boolean> {
    try {
      this.solutionRepository.delete({ id })
      return true
    } catch (err) {
      return false
    }
  }
}
