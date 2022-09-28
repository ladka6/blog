import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Comment } from './entities/comment.entitiy';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly repo: Repository<Post>, //private readonly userServie: UserService
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  publishPost(header: string, content: string, user: User) {
    const post = this.repo.create({ header, content, user });
    post.user = user;
    return this.repo.save(post);
  }

  async likePost(id: string) {
    const post = await this.repo.findOne({ where: { id: parseInt(id) } });
    post.like += 1;
    return this.repo.save(post);
  }

  async commentToPost(id: string, content: string) {
    const post = await this.repo.findOne({ where: { id: parseInt(id) } });
    const newComment = this.commentRepo.create({ content });
    newComment.post = post;
    return this.commentRepo.save(newComment);
  }

  // createComment(content: string, post: Post) {
  //   const newComment = this.commentRepo.create({ content });
  //   newComment.post = post;
  //   return this.commentRepo.save(newComment);
  // }

  async findAll() {
    const posts = await this.repo.find({
      relations: {
        comments: true,
        user: true,
      },
    });

    return posts;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

export interface IPost {
  header: string;
  content: string;
  like: number;
  date: Date;
  author: string;
  comment: string;
}
