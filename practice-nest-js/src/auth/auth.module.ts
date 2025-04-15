import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashingProvider } from './hashing.provider';
import { BcryptProvider } from './bcrypt.provider';
import { SignInProvider } from './sign-in.provider';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    SignInProvider,
  ],
  exports: [AuthService, HashingProvider],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forRoot({
      envFilePath: '.env.development', // Make sure it points to the correct file
      isGlobal: true,
    }),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class AuthModule {}
