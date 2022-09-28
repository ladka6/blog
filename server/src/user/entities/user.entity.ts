import { Exclude } from 'class-transformer';
import { Post } from 'src/post/entities/post.entity';
import {
  AfterInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  user_name: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @AfterInsert()
  afterInsert() {
    this.posts;
  }
}
