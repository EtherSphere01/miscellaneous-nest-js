import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  async hashPassword(password: string | Buffer): Promise<string> {
    //   Generate a salt
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  comparePassword(
    password: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, encrypted);
  }
}
