import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entitiy';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  like: number;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column()
  content: string;

  @Column()
  header: string;
}
