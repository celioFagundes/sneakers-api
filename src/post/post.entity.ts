import { registerEnumType } from '@nestjs/graphql'
import { User } from 'src/user/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum PostCategory {
  MOVIE = 'movie',
  MUSIC = 'music',
  GAME = 'game',
  SHOWS = 'shows',
  GENERAL = 'general',
}
registerEnumType(PostCategory, {
  name: 'PostCategory',
})

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => User, user => user.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User

  @Column()
  title: string

  @Column()
  @Generated('uuid')
  slug: string

  @Column({
    type: 'enum',
    enum: PostCategory,
    default: PostCategory.GENERAL,
    nullable: false,
  })
  category: PostCategory

  @Column({ length: 500, nullable: false })
  description: string

  @Column({ nullable: false, default: false })
  solved: boolean

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date
}
