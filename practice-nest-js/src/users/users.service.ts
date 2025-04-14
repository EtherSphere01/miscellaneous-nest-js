import { Inject, Injectable } from '@nestjs/common';
import { first } from 'rxjs';
import { PassThrough } from 'stream';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    // injection of user repository
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: createUserDto) {
    // check is user already exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    // handle exceptions if user already exists

    // create user
    let user = this.usersRepository.create(createUserDto);
    // save user to database
    user = await this.usersRepository.save(user);
    return user;
  }

  public findAll() {
    return [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        Password: 'abdho12@',
        email: 'john@gmail.com',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        Password: 'abdsho12@',
        email: 'doe@gmail.com',
      },
    ];
  }
}
