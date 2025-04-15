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
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';

@Injectable()
export class UsersService {
  constructor(
    // injection of user repository

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    // injecting config service

    private readonly configService: ConfigService,

    // inject create user provider

    private readonly createUserProvider: CreateUserProvider,

    // inject find one user by email provider

    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
  ) {}

  public async createUser(createUserDto: createUserDto) {
    return this.createUserProvider.createUser(createUserDto);
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

  async findOneUserByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneUserByEmail(email);
  }
}
