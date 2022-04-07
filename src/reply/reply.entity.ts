import { Solution } from 'src/solution/solution.entity'
import { User } from 'src/user/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Reply {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => User, user => user.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User

  @ManyToOne(type => Solution, solution => solution.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  solution: Solution

  @Column()
  description: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date
}
