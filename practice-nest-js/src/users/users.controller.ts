import { Controller, Get, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  public getUsers() {
    return 'getUsers()';
  }

  @Put()
  createUser() {
    return 'createUser()';
  }
}
