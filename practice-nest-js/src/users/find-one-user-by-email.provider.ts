import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOneUserByEmail(email: string) {
    let user;
    try {
      user = await this.usersRepository.findOne({
        where: { email },
      });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Error finding user by email',
      });
    }

    if (!user) {
      throw new UnauthorizedException('User not found with this email address');
    }

    return user;
  }
}
