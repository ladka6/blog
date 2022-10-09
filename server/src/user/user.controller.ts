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
import { Request } from 'express';
import { UserActivated } from './decorators/user-activated.decorator';
import { UserActivatedInterceptor } from './interceptors/user-activated.interceptor';

@Controller('user')
@UseInterceptors(CurrentUserInterceptor, UserActivatedInterceptor)
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
    session.acitavted = false;
    return user;
  }

  @Post('/activate')
  async activate(
    @Body() body: any,
    @CurrentUser() user: User,
    @Session() session: any,
  ) {
    const activateUser = this.authService.activate(
      user.user_name,
      user.email,
      body.value,
    );
    session.acitavted = true;
    return activateUser;
  }

  @Get('/whoami')
  currentUser(@CurrentUser() user: User, @Session() session: any) {
    return user;
  }

  @Get('/deneme')
  isActivated(@UserActivated() activated: boolean, @Session() session: any) {
    console.log(activated);
    return activated;
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
  findOne(@Param('id') id: string, @UserActivated() user: User) {
    //console.log(user);
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

  // @Get('/mail')
  // sendMail() {
  //   this.authService.sendEmail('deneme');
  // }

  @Get('/denem')
  deneme(@UserActivated() user: User) {
    return user;
  }
}
