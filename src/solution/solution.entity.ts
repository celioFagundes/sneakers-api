import { Post } from 'src/post/post.entity'
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
export class Solution {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => User, user => user.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User

  @ManyToOne(type => Post, post => post.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  post: Post

  @Column()
  description: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date
}
