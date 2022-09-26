import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UserService } from './user.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp(user_name: string, email: string, password: string) {
    const usersByName = await this.userService.find(user_name, email);
    if (usersByName.length) {
      throw new BadRequestException('Username or email is in use');
    }
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // Create a new user and save it
    const user = await this.userService.create(user_name, email, result);

    // Return user
    return user;
  }

  async signIn(user_name: string, email: string, password: string) {
    const [user] = await this.userService.find(user_name, email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
