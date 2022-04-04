import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  username: string
  @Column({ length: 500, nullable: false })
  description: string
}
