import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(user_name: string, email: string, password: string) {
    const user = this.repo.create({ user_name, email, password });

    return this.repo.save(user);
  }

  findAll() {
    const users = this.repo.find();
    return users;
  }

  findOne(id: number) {
    const user = this.repo.findOneBy({ id });
    return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User does not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User does not found');
    }
    return this.repo.remove(user);
  }

  find(user_name: string, email: string) {
    const user = this.repo.find({ where: { user_name, email } });
    return user;
  }
}
