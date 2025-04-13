import { Injectable } from '@nestjs/common';
import { first } from 'rxjs';
import { PassThrough } from 'stream';

@Injectable()
export class UsersService {
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
