import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Session,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './entities/user.entity';

@Controller('user')
@UseInterceptors(CurrentUserInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signin')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(
      body.user_name,
      body.email,
      body.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(
      body.user_name,
      body.email,
      body.password,
    );
    session.userId = user.id;
    return user;
  }

  @Get('/whoami')
  currentUser(@CurrentUser() user: User) {
    return user;
  }

  @Get('/deneme')
  deneme(@Req() request) {
    console.log(request.session); // or "request.cookies['cookieKey']"
    // or console.log(request.signedCookies);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/query')
  findByUserNameAndEmail(@Query() str: any) {
    return this.userService.find(str.user_name, str.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(parseInt(id), updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
