import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dtos/signin.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignInProvider {
  constructor(
    //   inject user service

    private readonly userService: UsersService,

    //   inject hashing provider

    private readonly hashingProvider: HashingProvider,
  ) {}

  async signIn(signInDto: SignInDto) {
    let user = await this.userService.findOneUserByEmail(signInDto.email);

    //   compare password with hashed password

    let isEqual: boolean = false;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Error comparing password',
      });
    }

      if (!isEqual) {
          throw new UnauthorizedException(
              'Password is incorrect. Please try again',
          );
      }

    return true;
  }
}
