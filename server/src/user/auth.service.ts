import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UserService } from './user.service';
// import { nodemailer } from 'nodemailer';
const nodemailer = require('nodemailer');

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private val: number) {
    this.val = Math.floor(1000 + Math.random() * 9000);
  }

  sendEmail(email: string) {
    // var val = Math.floor(1000 + Math.random() * 9000);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'egeerdal6@gmail.com',
        pass: 'jjyxmrlwqpbviikq',
      },
    });

    var mailOptions = {
      from: 'egeerdal6@gmail.com',
      to: `${email}`,
      subject: 'Sending Email using Node.js',
      text: `<h1>Your Code is</h1><h3>${this.val}</h3>`,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        throw new Error(err);
      } else {
        console.log('Email sent: ' + info.response);
        return true;
      }
    });
  }

  verificate(userVal: number, val: number) {
    if (userVal === val) {
      return true;
    } else return false;
  }

  async signUp(user_name: string, email: string, password: string) {
    const usersByName = await this.userService.find(user_name, email);

    if (usersByName.length) {
      throw new BadRequestException('Username or email is in use');
    }

    this.sendEmail(email);

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

  async activate(user_name: string, email: string, value: number) {
    const [user] = await this.userService.find(user_name, email);
    if (!user) throw new BadRequestException('User not found');
    if (this.verificate(value, this.val)) {
      user.active = true;
      this.userService.save(user);
      return user;
    } else {
      throw new BadRequestException('Incorrect value');
    }
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
