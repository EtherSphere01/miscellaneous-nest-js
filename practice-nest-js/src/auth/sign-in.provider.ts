import {
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dtos/signin.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from './config/jwt.config';

@Injectable()
export class SignInProvider {
  constructor(
    //   inject user service

    private readonly userService: UsersService,

    //   inject hashing provider

    private readonly hashingProvider: HashingProvider,

    //   inject jwt service

    private readonly jwtService: JwtService,

    //   inject jwt config

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
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

    //   return jwt token
    //   generate access token

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    return {
      accessToken,
    };
  }
}
