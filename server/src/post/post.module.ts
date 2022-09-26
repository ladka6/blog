import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Comment])],
  controllers: [PostController],
  providers: [PostService, UserService],
})
export class PostModule {}
