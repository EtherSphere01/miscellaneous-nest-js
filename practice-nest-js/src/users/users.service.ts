import {
  BadRequestException,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { first } from 'rxjs';
import { PassThrough } from 'stream';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from './dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    // injection of user repository

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    // injecting config service

    private readonly configService: ConfigService,
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
      let user = this.usersRepository.create(createUserDto);
      // save user to database
      user = await this.usersRepository.save(user);
      return user;
    }
  }

  public findAll() {
    const environment = this.configService.get<string>('S3_BUCKET');

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
