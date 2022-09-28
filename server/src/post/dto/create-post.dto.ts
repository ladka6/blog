import { IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreatePostDto {
  @IsString()
  header: string;

  @IsString()
  content: string;
}
