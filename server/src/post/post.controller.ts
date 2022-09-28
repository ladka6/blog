import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from 'src/user/user.service';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CurrentUserInterceptor } from 'src/user/interceptors/current-user.interceptor';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('post')
@UseInterceptors(CurrentUserInterceptor)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Post('/publish')
  create(@Body() createPostDto: CreatePostDto, @CurrentUser() user: User) {
    user;
    return this.postService.publishPost(
      createPostDto.header,
      createPostDto.content,
      user,
    );
  }

  @Patch('/:id')
  likePost(@Param('id') id: string) {
    return this.postService.likePost(id);
  }

  @Post('/comment/:id')
  createComment(@Param('id') id: string, @Body() body: CreateCommentDto) {
    return this.postService.commentToPost(id, body.content);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
