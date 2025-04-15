import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { HashingProvider } from 'src/auth/hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    // injection hashing provider

    private readonly hashingProvider: HashingProvider,
  ) {}
  public async createUser(createUserDto: createUserDto) {
    let existingUser;
    try {
      // check is user already exists
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      // handle error if user already exists
      throw new RequestTimeoutException(
        'User already exists with this email address',
        {
          cause: error,
          description: 'User already exists with this email address',
        },
      );
    }
    if (existingUser) {
      throw new BadRequestException(
        'User already exists with this email address',
      );
    } else {
      // handle exceptions if user already exists

      // create user
      let user = this.usersRepository.create({
        ...createUserDto,
        password: await this.hashingProvider.hashPassword(
          createUserDto.password,
        ),
      });
      // save user to database
      user = await this.usersRepository.save(user);
      return user;
    }
  }
}
